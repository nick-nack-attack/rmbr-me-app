// functions for various jobs
import { format } from 'date-fns';

export const findRmbrByPersonId = (rmbrArray=[], person_id) => (
    (!person_id)
        ? rmbrArray
        : rmbrArray.filter(r => r.person_id === person_id)
);

export default function PrettyDate(oldDate) {
    return format(new Date(oldDate), 'MMM d')
};

    