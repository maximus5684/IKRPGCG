function load_array(type, exclusions) {
    var books = ['Core', 'KNG'];
    var retArr = [];
    var arrName = "";

    switch (type) {
        case 'races':
            arrName = "race";

            break;
        case 'archetypes':
            arrName = "arch";

            break;
        case 'careers':
            arrName = "career";

            break;
        case 'abilities':
            arrName = "abil";

            break;
        case 'military skills':
            arrName = "milSkills";

            break;
        case 'occupational skills':
            arrName = "occSkills";

            break;
        case 'general skills':
            arrName = "genSkills";

            break;
        case 'spells':
            arrName = "spells";

            break;
        case 'languages':
            arrName = "lang";

            break;
        case 'xp advances':
            arrName = "xpAdv";

            break;
    }
    
    for (var i = 0; i < books.length; i++) {
        if (exclusions.indexOf(books[i]) == -1) {
            var arrFullName = arrName + books[i] + "Arr";

            try {
                retArr = retArr.concat(eval(arrFullName));
            } catch (e) {
                // If this failed, it means that the array didn't exist. That's OK, so we do nothing.
                // Bad code, I know. Can't think of a better way around this.
            }
        }
    }

    return retArr;
}

function byName(objA, objB) {
    if (objA.Name > objB.Name) {
        return 1;
    } else {
        return -1;
    }
}
