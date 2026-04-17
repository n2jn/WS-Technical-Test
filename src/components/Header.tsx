import { Text, View } from "react-native"

type HeaderProps = {
    title1: string
    title2: string
    sub: string
    variant?: 'home' | 'favorites'
}

const HeaderHome = ({ title1, title2, sub }: HeaderProps) => {
    return (
        <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
            <View style={{ flexGrow: 1 }}>
                <Text style={{ color: 'black', fontWeight: 900, fontSize: 32 }}>
                    {title1}
                </Text>
                <Text style={{ color: '#FF4D00', fontWeight: 900, fontSize: 32, fontStyle: 'italic', lineHeight: 32 }}>
                    {title2}
                </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', paddingBottom: 6 }}>
                <Text style={{ color: '#9A9590', fontWeight: 500, fontSize: 12, lineHeight: 12 }}>
                    {sub}
                </Text>
            </View>
        </View>
    )
}

const HeaderFavorites = ({ title1, title2, sub }: HeaderProps) => {
    return (
        <View style={{ paddingHorizontal: 24, flexDirection: 'row' }}>
            <View style={{ flexGrow: 1 }}>
                <Text style={{ color: 'black', fontWeight: 900, fontSize: 32 }}>
                    {title1}
                </Text>
                <Text style={{ color: '#FF4D00', fontWeight: 900, fontSize: 32, fontStyle: 'italic', lineHeight: 32 }}>
                    {title2}
                </Text>
                <View style={{ paddingVertical: 4 }}>
                    <Text style={{ color: '#9A9590', fontWeight: 500, fontSize: 12 }}>
                        {sub}
                    </Text>
                </View>
            </View>
        </View>
    )
}

export const Header = ({ variant, ...headerProps }: HeaderProps) => {
    switch (variant) {
        case 'home':
            return <HeaderHome {...headerProps} />
        default:
            return <HeaderFavorites {...headerProps} />
    }
}