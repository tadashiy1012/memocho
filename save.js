'use strict';

const remote = require('remote');
const os = remote.require('os');
const path = require('path');
const fs = require('fs');

const desktopDirName = 'Desktop';
const textFileName = 'memo.txt';
const homeDirPath = os.homedir();
const desktopDirPath = path.join(homeDirPath, desktopDirName);
const textFilePath = path.join(desktopDirPath, textFileName);

const saveButton = document.querySelector('#saveBtn');
const textArea = document.querySelector('#text');

function saveText() {
    console.log(textArea);
    let txt = textArea.value;
    fs.writeFile(textFilePath, txt, (err) => {
        if (err) {
            window.alert('file save failed.');
        } else {
            window.alert('file save success.');
        }
    });
}

saveButton.addEventListener('click', saveText, false);