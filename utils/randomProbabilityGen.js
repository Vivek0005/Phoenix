// function to generate random probability

function generateProbabilty() {
    return `${Math.floor(Math.random() * 41) + 60}%`;
}

module.exports = generateProbabilty;