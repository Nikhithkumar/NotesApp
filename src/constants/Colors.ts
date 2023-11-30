
interface LIGHT {
    PRIMARY_BLACK: string;
    PRIMARY_WHITE: string;
    ORANGE: string;
    GRAY: string;
    DARK_ORANGE: string;
    BLACK: string;
    LIGHT_BLACK: string;
}

interface COLORS {
    LIGHT: LIGHT;
    DARK: LIGHT; // Assuming DARK has the same structure as LIGHT
}

export const COLORS= [
   {
        PRIMARY_BLACK:"#0C0F14",
        PRIMARY_WHITE:"#FFFFFF",
        ORANGE:"#D17842",
        DARK_ORANGE:"",
        GRAY:"",
        BLACK:"#141921",
        LIGHT_BLACK:'#0C0F14',
        TEXT:"#0C0F14",
        LINER:"#252A32",
    },
   {
        PRIMARY_BLACK:"#FFFFFF",
        PRIMARY_WHITE:"#0C0F14",
        ORANGE:"#D17842",
        DARK_ORANGE:"",
        GRAY:"",
        BLACK:"#FFFFFF",
        LIGHT_BLACK:'#FFFFFF',
        TEXT:"#FFFFFF",
        LINER:"darkgray"
    }
]