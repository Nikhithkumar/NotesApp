import il8n from 'i18next'
import {initReactI18next} from 'react-i18next'
import * as resources from './resourse'

il8n.use(initReactI18next).init({
    compatibilityJSON:'v3',
    resources:{
        ...Object.entries(resources).reduce(
            (acc,[key,value])=>({
                ...acc,
                [key]:{
                    translation:value,
                },
            }),
            {},
        ),
    },
    lng:'en',
})

export default il8n
