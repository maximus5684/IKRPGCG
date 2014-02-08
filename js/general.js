function load_array(type, exclusions) {
    var books = ['Core'];
    var retArr = [];

    switch (type) {
        case 'races':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("race" + books[i] + "Arr"));
                }
            }

            break;
        case 'archetypes':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("arch" + books[i] + "Arr"));
                }
            }

            break;
        case 'careers':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("career" + books[i] + "Arr"));
                }
            }

            break;
        case 'abilities':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("abil" + books[i] + "Arr"));
                }
            }

            break;
        case 'military skills':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("milSkills" + books[i] + "Arr"));
                }
            }

            break;
        case 'occupational skills':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("occSkills" + books[i] + "Arr"));
                }
            }

            break;
        case 'general skills':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("genSkills" + books[i] + "Arr"));
                }
            }

            break;
        case 'spells':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("spells" + books[i] + "Arr"));
                }
            }

            break;
        case 'languages':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("lang" + books[i] + "Arr"));
                }
            }

            break;
        case 'xp advances':
            for (var i = 0; i < books.length; i++) {
                if (exclusions.indexOf(books[i]) == -1) {
                    retArr = retArr.concat(eval("xpAdv" + books[i] + "Arr"));
                }
            }

            break;
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
