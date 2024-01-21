let text;
let wordList;
let textElement = document.getElementById("inputField");
let higherCaseElement = document.getElementById("higherCase");
let sortByElement = document.getElementById("sortBy");
let textAreaFilled = false;

// Function to process the input text
function separa() {
    if (!textAreaFilled) {
        return;
    }

    // Get the input text
    text = textElement.value;

    // Convert to lowercase if 'Ignore Case' checkbox is checked
    if (!higherCaseElement.checked) {
        text = text.toLowerCase();
    }

    // Remove non-word characters and digits
    text = text.replace(/[^\w\s]|[\d]/g, '');

    // Split the text into a list of words
    wordList = text.split(/\s+/);

    // Create a frequency table for words
    const frequencyTable = wordList.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
    }, {});

    // Extract unique words from the frequency table
    const uniqueWordList = Object.keys(frequencyTable).filter(word => word !== "");

    // Sort the unique word list based on user preference
    switch (sortByElement.value) {
        case "alphabetic":
            uniqueWordList.sort();
            break;
        case "frequency":
            uniqueWordList.sort((a, b) => frequencyTable[b] - frequencyTable[a]);
            break;
        case "length":
            uniqueWordList.sort((a, b) => a.length - b.length);
            break;
    }

    // Update the input field with the sorted word list
    textElement.value = uniqueWordList.join("\n");
}

// Function to handle click event on the text area
function textAreaClicked() {
    if (!textAreaFilled) {
        // Clear the input field when clicked for the first time
        textElement.value = "";
        textAreaFilled = true;
    }
}

// Function to copy the sorted word list to the clipboard
function copyList() {
    navigator.clipboard.writeText(textElement.value);
}

// Function to download the sorted word list as a text file
function downloadList() {
    // Create a Blob containing the text data
    const blob = new Blob([textElement.value], { type: "text/plain" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const a = document.createElement("a");
    a.href = url;
    a.download = "woordenlijst.txt";

    // Append the link to the document body, trigger a click event, and remove the link
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to delete the content of the input field
function deleteList() {
    textElement.value = "";
}
