import csv from 'csvtojson';
import axios from 'axios';
import { formatGoogleSheets } from '../modules/fun/formatSheets';

export async function getQuestions() {
    try {
        const url =
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vQKA8puo4VxLJgYNsbFNl6KeI1lFE1lz2m0BmBfAQQgBP0dNc7IwDhnQKr8faVty8_anQZ5ZGcRDbCH/pub?gid=70996053&single=true&output=csv';

        const sheetsDate = await axios.get(url);
        const decoding = await csv({
            noheader: false,
            output: 'json',
        })
            .fromString(sheetsDate.data)
            .then((csvRow) => {
                return csvRow;
            });
        if (sheetsDate === null) {
            console.log('Could not perform fetch operation form google Sheet');
            return null;
        }
        return formatGoogleSheets(decoding);
    } catch (err) {
        console.error('Could not get Questions data');
        throw err;
    } finally {
    }
}
