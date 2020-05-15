export const findPerson = (people=[], personId) =>
    people.find(p => p.id === personId);

export const findRmbr = (rmbrs=[], rmbrId) =>
    rmbrs.find(r => r.id === rmbrId);

export const getRmbrsForPerson = (rmbrs=[], personId) => (
    (!personId)
        ? rmbrs
        : rmbrs.filter(r => r.person_id == personId)
    );

export const countRmbrsForPerson = (rmbrs=[], personId) =>
    rmbrs.filter(r => r.person_id === personId).length;