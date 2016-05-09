'use strict';

const remote = require('remote');
const os = remote.require('os');
const path = require('path');
const fs = require('fs');

const dialog = remote.require('dialog');
const browserWindow = remote.require('browser-window');

const desktopDirName = 'Desktop';
const textFileName = 'memo.txt';
const homeDirPath = os.homedir();
const desktopDirPath = path.join(homeDirPath, desktopDirName);
const textFilePath = path.join(desktopDirPath, textFileName);

const saveButton = document.querySelector('#saveBtn');
const loadButton = document.querySelector('#loadBtn');
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

function loadText() {
    let focusedWindow = browserWindow.getFocusedWindow();
    dialog.showOpenDialog(focusedWindow, {
        properties: ['openFile'],
        filters: [{
            name: 'テキストファイル',
            extensions: ['txt']
        }]
    }, (files) => {
        let str = '';
        files.forEach((file) => {
            console.log(file);
            let buf = fs.readFileSync(file);
            str += buf.toString();
        });
        console.log(str);
        textArea.value = str;
    });
}

saveButton.addEventListener('click', saveText, false);
loadButton.addEventListener('click', loadText, false);