'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function nodeListIndexOf(list, element) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === element) {
            return i;
        }
    }

    return -1;
}

class Tblr {
    constructor() {
        this.inputArea = $('#data-input');
        this.sidebarAreaSelectElements = $$('main > aside select');
        this.sidebarAreaCheckboxElements = $$('main > aside input[type=checkbox]');
        this.tabElements = $$('.tab-element .tabs .tab');

        this.prepareEvents();
        this.displayVersion();
        this.convertInput();
    }

    get version() { return chrome.runtime.getManifest().version; }

    prepareEvents() {
        this.inputArea.addEventListener('input', (event) => this.convertInput(event), false);
        this.inputArea.addEventListener('keydown', (event) => {
            Tblr.supportTab(event);
            this.forwardEvents(event);
        }, false);

        for (let i = 0; i < this.tabElements.length; i++) {
            this.tabElements[i].addEventListener('click', (event) => Tblr.changeTab(event), false);
        }

        for (let i = 0; i < this.sidebarAreaSelectElements.length; i++) {
            this.sidebarAreaSelectElements[i].addEventListener('change', (event) => this.convertInput(event), false);
        }

        for (let i = 0; i < this.sidebarAreaCheckboxElements.length; i++) {
            this.sidebarAreaCheckboxElements[i].addEventListener('click', (event) => this.convertInput(event), false);
        }
    }

    displayVersion() {
        $('#app-version').innerText = this.version;
    }

    convertInput() {
        const tableData = this.inputArea.value !== '' ? this.inputArea.value.split('\n') : [];
        const oColumnDelimiter = $('#setting-column-delimiter').value;
        const oFillEmptyCells = $('#setting-fill-empty-cells').checked;
        const oIncludeTableElement = $('#setting-include-table-element').checked;
        const oFirstRowTh = $('#setting-first-row-th').checked;
        let maxColumnsCount = 0;
        let emptyCellsCount = 0;
        let rowCounter;

        for (rowCounter = 0; rowCounter < tableData.length; rowCounter++) {
            const tableLineData = tableData[rowCounter].split(oColumnDelimiter);
            const indent = oIncludeTableElement ? '\t' : '';
            const tableCellTag = oFirstRowTh && rowCounter === 0 ? 'th' : 'td';
            let columnCounter;

            for (columnCounter = 0; columnCounter < tableLineData.length; columnCounter++) {
                if (tableLineData[columnCounter] === '') {
                    // fill empty cells with &nbsp;
                    if (oFillEmptyCells) {
                        tableLineData[columnCounter] = '&nbsp;';
                    }

                    emptyCellsCount++;
                }
            }

            if (columnCounter > maxColumnsCount) {
                maxColumnsCount = columnCounter;
            }

            const rowHtml = tableLineData.join(`</${tableCellTag}><${tableCellTag}>`);

            tableData[rowCounter] = `${indent}<tr><${tableCellTag}>${rowHtml}</${tableCellTag}></tr>`;
        }

        const rowsHtml = tableData.join('\n');
        const tableHtml = '<table>\n' + rowsHtml + '\n</table>';
        const noResultText = 'No data available!\n\nPlease input some data into the textarea on the left.';

        $('#code-output').value = tableData.length > 0 ? (oIncludeTableElement ? tableHtml : rowsHtml) : noResultText;
        $('#code-preview').innerHTML = tableHtml;

        // update information section
        $('#aside-info-lines').innerText = rowCounter;
        $('#aside-info-columns').innerText = maxColumnsCount;
        $('#aside-info-empty-cells').innerText = emptyCellsCount;
    }

    static supportTab(event) {
        if (event.keyCode === 9) {
            event.preventDefault();

            const start = event.currentTarget.selectionStart;
            const end = event.currentTarget.selectionEnd;

            event.currentTarget.value = event.currentTarget.value.substring(0, start) + '\t' + event.currentTarget.value.substring(end);
            event.currentTarget.selectionStart = event.currentTarget.selectionEnd = start + 1;
        }
    }

    forwardEvents() {
        const evt = document.createEvent('HTMLEvents');

        evt.initEvent('input', false, true);
        this.inputArea.dispatchEvent(evt);
    }

    static changeTab(event) {
        const clickedTab = event.currentTarget;
        const tabElement = clickedTab.parentElement.parentElement;
        const allTabs = tabElement.querySelectorAll('.tabs .tab');
        const clickedTabIndex = nodeListIndexOf(allTabs, clickedTab);
        const allTabBodyElements = tabElement.querySelectorAll('.tab-contents .tab-body');

        for (let i = 0; i < allTabs.length; i++) {
            allTabs[i].classList.remove('current');
            allTabBodyElements[i].classList.remove('current');
        }

        allTabs[clickedTabIndex].classList.add('current');
        allTabBodyElements[clickedTabIndex].classList.add('current');
    }
}

new Tblr();