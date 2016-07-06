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
const defaultTextFilePath = path.join(desktopDirPath, textFileName);

let loadedTextFilePath = null;

const saveButton = document.querySelector('#saveBtn');
const loadButton = document.querySelector('#loadBtn');
const textArea = document.querySelector('#text');

function saveText() {
    let txt = textArea.value;
    const path = loadedTextFilePath || defaultTextFilePath;
    fs.writeFile(path, txt, (err) => {
        if (err) {
            window.alert('file save failed.');
        } else {
            window.alert('file save success.');
        }
    });
}

function loadText() {
    loadedTextFilePath = null;
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
            loadedTextFilePath = file;
            let buf = fs.readFileSync(file);
            str += buf.toString();
        });
        textArea.value = str;
    });
}

saveButton.addEventListener('click', saveText, false);
loadButton.addEventListener('click', loadText, false);