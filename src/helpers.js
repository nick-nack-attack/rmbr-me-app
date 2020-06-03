export const findRmbrByPersonId = (rmbrArray=[], person_id) => (
    (!person_id)
        ? rmbrArray
        : rmbrArray.filter(r => r.person_id === person_id)
    );
