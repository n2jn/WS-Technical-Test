import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useFetch } from "./useFetch";
import { server } from "../../msw_api/node-server/server";
import { rest } from "msw";
import { StoresResponse } from "../../../src/types/store";

describe("useFetch", () => {
    it("initial fetch", async () => {
      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      // The MSW handler returns 50 stores
      expect(result.current.data).toBeDefined();
      expect(result.current.data).not.toBeNull();
      expect(result.current.data!.stores).toHaveLength(50);
      expect(result.current.data!.stores[0]).toMatchObject({
        id: 1,
        name: "Magasin 1",
        address: "1 rue de Paris",
        hours: "9h - 19h",
      });
      expect(result.current.data!.stores[0]).toHaveProperty("latitude");
      expect(result.current.data!.stores[0]).toHaveProperty("longitude");
      expect(result.current.error).toBeNull();
    });

    it("Abort signal received on unmount", async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, "abort");

      const { unmount } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      unmount()

      expect(abortSpy).toHaveBeenCalled();
      abortSpy.mockRestore();
    });


    it("refetch successful", async () => {
      let callCount = 0;

      server.use(
        rest.get('https://api.example.com/stores', (_, res, ctx) => {
          callCount++;
          return res(ctx.json({}));
        })
      );

      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );
      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(callCount).toBe(1);

      await act(() => result.current.refetch())

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(callCount).toBe(2);

      expect(result.current.data).toBeDefined();
    });

    it("fetch error", async () => {
      server.use(
        rest.get('https://api.example.com/stores', (_, res, ctx) => {
          return res(ctx.status(500));
        })
      );

      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error?.message).toBe("HTTP error: 500");
      expect(result.current.data).toBeNull();
    });
})
