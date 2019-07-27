
/**
 * Encrypt value using the shift with position on replace for change message final cryting this value
 * @param {String} value 
 * @param {Int} shift 
 */
const encrypt = (value, shift) => {
    const letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").toLowerCase().split('')
    const newValue = value.split('').map(char => {
        char = char.toString().toLowerCase()
        if (char.match(/[a-z]/)) {
            let index = letters.indexOf(char) + shift
            if (index > 25) {
                return res = letters[index - letters.length]
            }
            else
                return res = letters[index]
        }
        return char
    }).join('')
    return newValue
}

/**
 * Decrypt value using shift used on encrypt but in this case is reverse the action decrypting this value
 * @param {String} value
 * @param {Int} shift
 */
const decrypt = (value, shift) => {
    const letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").toLowerCase().split('')
    const newValue = value.split('').map(char => {
        char = char.toString().toLowerCase()
        if (char.match(/[a-z]/)) {
            let index = letters.indexOf(char) - shift
            if (index < 0) {
                return res = letters[letters.length + index]
            }
            else
                return res = letters[index]
        }
        return char
    }).join('')
    return newValue
}

/**
 * This module produces Julio César's encryption with just two methods. Encrypt and Decrypt
 * @author Walisson Rodrigo
 * @email walissonrodrigo@outlook.com
 * @gitHub gitbub.com/WalissonRodrigo
 */
module.exports = {
    encrypt, decrypt
}