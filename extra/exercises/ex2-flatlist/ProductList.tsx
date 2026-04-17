import { ActivityIndicator, FlatList, Image, ListRenderItemInfo, Text, View, StyleSheet, TextInput } from "react-native"
import { useFetch } from "../ex1-useFetch"
import { useCallback, useMemo, useState, useEffect } from "react"
import { Product, ProductResponse } from "../../../src/types/product"
import debounce from 'lodash/debounce'

const PRODUCT_LIMIT = 20;
const PRODUCT_ITEM_HEIGHT = 80

export const ProductList = () => {
    const { data, loading, refetch } = useFetch<ProductResponse>("https://api.example.com/products", {
        params: {
            limit: PRODUCT_LIMIT,
            offset: 0
        }
    })
    const [filter, setFilter] = useState<string>('')
    const [paginatedData, setPaginatedData] = useState<Product[]>([])

    useEffect(() => {
        if (!data) {
            return;
        }

        if (data.offset === 0) {
            setPaginatedData(data.product);
        } else {
            setPaginatedData(prev => [...prev, ...data.product]);
        }
    }, [data])

    // // explain why in readme
    // const filteredProduct = useMemo(() => {
    //     if (!data) {
    //         return [];
    //     }
    //     if (filter.length > 0) {
    //         return data?.product?.filter((d) => d.name.includes(filter))
    //     }
    //     return data.product
    // }, [data, filter])

    const getItemLayout = useCallback((_data: any, index: number) => ({
        length: PRODUCT_ITEM_HEIGHT,
        offset: PRODUCT_ITEM_HEIGHT * index,
        index,
      }), [])

    const debouncedRefetch = useMemo(
        () => debounce(({name, offset}: {name: string, offset: number}) => {
            refetch({
                params: {
                    name: name,
                    limit: PRODUCT_LIMIT,
                    offset: offset
                },
            });
        }, 500),
        [refetch]
    );

    const handleOnChangeText = useCallback((rawText: string) => {
        const sanitizedText = rawText.trimEnd().trimStart()
        setFilter(rawText);
        debouncedRefetch({ name: sanitizedText, offset: 0 });
    }, [debouncedRefetch])

    // explain why in readme
    const renderItem = useCallback(({ item }: ListRenderItemInfo<Product>) => {
        return <View style={{ flexDirection: 'row', height: PRODUCT_ITEM_HEIGHT }}>
            <Image source={{ uri: item.imageUrl }} style={{ width: 80, height: 80 }} />
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                <Text>{item.price} €</Text>
            </View>
        </View>
    }, [])

    const handleOnEndReached = useCallback(() => {
        if (!data) return;
        
        const { total, offset, product } = data;
        
        if (total > 0 && total <= offset) {
            return
        }

        const newOffset = product.length + offset < total
        ? offset + PRODUCT_LIMIT
        : total

        debouncedRefetch({ name: filter, offset: newOffset });
    }, [data, filter])


    if (loading && !data) {
        return <ActivityIndicator />
    }

    return <>
        <View style={styles.filterContainer}>
            <TextInput value={filter} onChangeText={handleOnChangeText} textContentType={'name'} style={styles.input} />
        </View>
        <FlatList
            data={paginatedData}
            renderItem={renderItem}
            style={styles.container}
            // explain in readme
            keyExtractor={(item) => item.id.toString()}
            // explain in readme
            onEndReached={handleOnEndReached}
            onEndReachedThreshold={0.7}
            // explain on readme
            windowSize={5}
            maxToRenderPerBatch={PRODUCT_LIMIT}
            // explain on readme
            getItemLayout={getItemLayout}
        />
    </>

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    filterContainer: {
        width: '100%',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        padding: 8
    }
})