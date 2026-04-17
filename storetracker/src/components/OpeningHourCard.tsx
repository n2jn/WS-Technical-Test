import { Ionicons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { OpeningHours } from "../types/store"
import { useCallback } from "react"

type OpeningHourCardProps = {
    title: string
    openingHours: OpeningHours[]
}

export const OpeningHourCard = ({openingHours}: OpeningHourCardProps) => {

    const renderOpeningHours = useCallback((dayOpenings: OpeningHours, index: number) => {
          return (
            <View key={index}>
                <View style={{ borderTopWidth: 1, opacity: 0.3, borderColor: '#9A9590' }} />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, color: '#9A9590', fontWeight: 500 }}>{dayOpenings.day}</Text>
                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 700 }}>{dayOpenings.start}-{dayOpenings.end}</Text>
                </View>
            </View>
          )
    }, [openingHours]) 

    return (
        <View style={{ backgroundColor: 'white', borderRadius: 8, marginHorizontal: 24 }}>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8, alignItems: 'center', gap: 8 }}>
                <Ionicons accessible={false} name='time' size={18} color="black" />
                <Text style={{ fontSize: 14, color: 'black', fontWeight: 700 }}>Horaires d'ouvertures</Text>
            </View>
            {openingHours.map(renderOpeningHours)}
        </View>

    )
}