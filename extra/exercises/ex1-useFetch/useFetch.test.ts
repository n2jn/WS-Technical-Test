import { renderHook, waitFor, act } from "@testing-library/react-native";
import { useFetch } from "./useFetch";
import { server } from "../../msw_api/node-server/server";
import { rest } from "msw";
import { StoresResponse } from "../../../src/types/store";

describe("useFetch", () => {
    it("should fetch data successfully on initial mount", async () => {
      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      expect(result.current.loading).toBe(true);

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.data).toBeDefined();
      expect(result.current.data).not.toBeNull();
      expect(result.current.data!.stores).toHaveLength(10);
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

    it("should abort request on unmount", async () => {
      const abortSpy = jest.spyOn(AbortController.prototype, "abort");

      const { unmount } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      unmount();

      expect(abortSpy).toHaveBeenCalled();
      abortSpy.mockRestore();
    });

    it("should refetch data when refetch is called", async () => {
      let callCount = 0;

      server.use(
        rest.get('https://api.example.com/stores', (_, res, ctx) => {
          callCount++;
          return res(ctx.json({ stores: [] }));
        })
      );

      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(callCount).toBe(1);

      await act(() => result.current.refetch());

      await waitFor(() => expect(result.current.loading).toBe(false));
      expect(callCount).toBe(2);

      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });

    it("should handle HTTP errors correctly", async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

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
      expect(result.current.loading).toBe(false);

      consoleErrorSpy.mockRestore();
    });

    it("should handle network errors", async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      server.use(
        rest.get('https://api.example.com/stores', (_, res) => {
          return res.networkError("Network error");
        })
      );

      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores")
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error).toBeDefined();
      expect(result.current.data).toBeNull();

      consoleErrorSpy.mockRestore();
    });

    it("should build URL with query parameters correctly", async () => {
      let capturedUrl = "";

      server.use(
        rest.get('https://api.example.com/stores', (req, res, ctx) => {
          capturedUrl = req.url.toString();
          return res(ctx.json({ stores: [] }));
        })
      );

      const { result } = renderHook(() =>
        useFetch<StoresResponse>("https://api.example.com/stores", {
          params: { city: "Paris", limit: 10 }
        })
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(capturedUrl).toContain("city=Paris");
      expect(capturedUrl).toContain("limit=10");
    });

    it("should handle POST requests with body", async () => {
      let capturedMethod = "";
      let capturedBody: any = null;

      server.use(
        rest.post('https://api.example.com/stores', async (req, res, ctx) => {
          capturedMethod = req.method;
          capturedBody = await req.json();
          return res(ctx.json({ success: true }));
        })
      );

      const { result } = renderHook(() =>
        useFetch("https://api.example.com/stores", {
          method: 'POST',
          body: { name: "New Store" }
        })
      );

      expect(result.current.data).toBeNull();

      await act(() => result.current.refetch({
        method: 'POST',
        body: { name: "New Store" }
      }));

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(capturedMethod).toBe("POST");
      expect(capturedBody).toEqual({ name: "New Store" });
      expect(result.current.data).toEqual({ success: true });
    });

    it("should handle 404 errors", async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      server.use(
        rest.get('https://api.example.com/stores/999', (_, res, ctx) => {
          return res(ctx.status(404));
        })
      );

      const { result } = renderHook(() =>
        useFetch("https://api.example.com/stores/999")
      );

      await waitFor(() => expect(result.current.loading).toBe(false));

      expect(result.current.error?.message).toBe("HTTP error: 404");
      expect(result.current.data).toBeNull();

      consoleErrorSpy.mockRestore();
    });
});
