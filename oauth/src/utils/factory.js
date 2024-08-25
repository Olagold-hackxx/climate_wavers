function ensureEmail(inputString, provider) {
    // Regex pattern to check if the string is an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Check if the input string matches the email pattern
    if (emailPattern.test(inputString)) {
        return inputString;
    } else {
        // If not an email, append "@github.com"
        return `${inputString}@${provider}.com`;
    }
}

module.exports = ensureEmail