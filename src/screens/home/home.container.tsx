import { ActivityIndicator } from "react-native";
import { useFetch } from "../../../extra/exercises/ex1-useFetch"
import { Store, StoresResponse } from "../../types/store"
import { HomeScreen } from "./home.screen"
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";

const STORE_LIMIT = 20;

type HomeContainerProps = {
    goToDetail: (id: string | number) => void
}

export const HomeContainer = ({goToDetail}: HomeContainerProps) => {
    const [filter, setFilter] = useState<string>('')
    const [paginatedData, setPaginatedData] = useState<Store[]>([])
    const { data, loading, refetch, error } = useFetch<StoresResponse>('https://api.example.com/stores', {
        params: {
            limit: STORE_LIMIT,
            offset: 0
        }
    })

    useEffect(() => {
        if (!data) {
            return;
        }

        if (data.offset === 0) {
            setPaginatedData(data.stores);
        } else {
            setPaginatedData(prev => [...prev, ...data.stores]);
        }
    }, [data])


    const debouncedRefetch = useMemo(
        () => debounce(({name, offset}: {name: string, offset: number}) => {
            refetch({
                params: {
                    name: name,
                    limit: STORE_LIMIT,
                    offset: offset
                },
            });
        }, 200),
        [refetch]
    );

    const handleOnChangeText = useCallback((rawText: string) => {
        const sanitizedText = rawText.trimEnd().trimStart()
        setFilter(rawText);
        debouncedRefetch({ name: sanitizedText, offset: 0 });
    }, [debouncedRefetch])



    const handleOnEndReached = useCallback(() => {
        if (!data) return;
        
        const { total, offset, stores } = data;
        
        if (total > 0 && total <= offset) {
            return
        }

        const newOffset = stores.length + offset < total
        ? offset + STORE_LIMIT
        : total

        debouncedRefetch({ name: filter, offset: newOffset });
    }, [data, filter])


    if (loading && !data) {
        return <ActivityIndicator style={{flex: 1}}/>
    }

    return <HomeScreen
            onChangeText={handleOnChangeText}
            onItemPress={goToDetail}
            stores={paginatedData}
            onEndReached={handleOnEndReached}
            searchValue={filter}
            totalStores={data?.total || 0}
            error={!!error}
        />
}