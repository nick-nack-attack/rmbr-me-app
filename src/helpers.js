export const findPersonById = (personArray, person_id) => {
    console.log(personArray, person_id)
    return personArray.find(p => p.id === person_id);

}

export const findRmbrById = (rmbrArray=[], rmbr_id) =>
    rmbrArray.find(r => r.id === rmbr_id);

export const findRmbrByPersonId = (rmbrArray=[], person_id) => (
    (!person_id)
        ? rmbrArray
        : rmbrArray.filter(r => r.person_id === person_id)
    );

export const countEachRmbr = (rmbrArray=[], person_id) =>
    rmbrArray.filter(r => r.person_id === person_id).length;