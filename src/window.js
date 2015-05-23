'use strict';

const $ = document.querySelector.bind(document),
    $$ = document.querySelectorAll.bind(document);

function nodeListIndexOf(list, element)
{
    for (let i = 0; i < list.length; i++)
    {
        if (list[i] === element)
        {
            return i;
        }
    }

    return -1;
}

class Tblr
{
    constructor()
    {
        this.inputArea = $('#data-input');
        this.sidebarAreaSelectElements = $$('main > aside select');
        this.sidebarAreaCheckboxElements = $$('main > aside input[type=checkbox]');
        this.tabElements = $$('.tab-element .tabs .tab');

        this.prepareEvents();
        this.displayVersion();
        this.convertInput();
    }

    get version() { return chrome.runtime.getManifest().version; }

    prepareEvents()
    {
        let that = this;
        this.inputArea.addEventListener('input', function (event) { that.convertInput(event); }, false);
        this.inputArea.addEventListener('keydown', function (event)
        {
            Tblr.supportTab(event);
            that.forwardEvents(event);
        }, false);

        for (let i = 0; i < this.tabElements.length; i++)
        {
            this.tabElements[i].addEventListener('click', function (event) { Tblr.changeTab(event); }, false);
        }

        for (let i = 0; i < this.sidebarAreaSelectElements.length; i++)
        {
            this.sidebarAreaSelectElements[i].addEventListener('change', function (event) { that.convertInput(event); }, false);
        }

        for (let i = 0; i < this.sidebarAreaCheckboxElements.length; i++)
        {
            this.sidebarAreaCheckboxElements[i].addEventListener('click', function (event) { that.convertInput(event); }, false);
        }
    }

    displayVersion()
    {
        $('#app-version').innerText = this.version;
    }

    convertInput()
    {
        const tableData = this.inputArea.value !== '' ? this.inputArea.value.split('\n') : [],
            oColumnDelimiter = $('#setting-column-delimiter').value,
            oFillEmptyCells = $('#setting-fill-empty-cells').checked,
            oIncludeTableElement = $('#setting-include-table-element').checked,
            oFirstRowTh = $('#setting-first-row-th').checked;

        let maxColumnsCount = 0,
            emptyCellsCount = 0,
            rowCounter;

        for (rowCounter = 0; rowCounter < tableData.length; rowCounter++)
        {
            const tableLineData = tableData[rowCounter].split(oColumnDelimiter),
                indent = oIncludeTableElement ? '\t' : '',
                tableCellTag = oFirstRowTh && rowCounter === 0 ? 'th' : 'td';
            let columnCounter;

            for (columnCounter = 0; columnCounter < tableLineData.length; columnCounter++)
            {
                if (tableLineData[columnCounter] === '')
                {
                    // START | fill empty cells with &nbsp;
                    if (oFillEmptyCells)
                    {
                        tableLineData[columnCounter] = '&nbsp;';
                    }
                    // END | fill empty cells with &nbsp;

                    emptyCellsCount++;
                }
            }

            if (columnCounter > maxColumnsCount)
            {
                maxColumnsCount = columnCounter;
            }

            const rowHtml = tableLineData.join(`</${tableCellTag}><${tableCellTag}>`);

            tableData[rowCounter] = `${indent}<tr><${tableCellTag}>${rowHtml}</${tableCellTag}></tr>`;
        }

        const rowsHtml = tableData.join('\n'),
            tableHtml = '<table>\n' + rowsHtml + '\n</table>',
            noResultText = 'No data available!\n\nPlease input some data into the textarea on the left.';

        $('#code-output').value = tableData.length > 0 ? (oIncludeTableElement ? tableHtml : rowsHtml) : noResultText;
        $('#code-preview').innerHTML = tableHtml;

        // update information section
        $('#aside-info-lines').innerText = rowCounter;
        $('#aside-info-columns').innerText = maxColumnsCount;
        $('#aside-info-empty-cells').innerText = emptyCellsCount;
    }

    static supportTab(event)    
    {
        if (event.keyCode === 9)
        {
            event.preventDefault();

            const start = event.currentTarget.selectionStart,
            end = event.currentTarget.selectionEnd;

            event.currentTarget.value = event.currentTarget.value.substring(0, start) + '\t' + event.currentTarget.value.substring(end);
            event.currentTarget.selectionStart = event.currentTarget.selectionEnd = start + 1;
        }
    }

    forwardEvents()
    {
        const evt = document.createEvent('HTMLEvents');

        evt.initEvent('input', false, true);
        this.inputArea.dispatchEvent(evt);
    }

    static changeTab(event)
    {
        const clickedTab = event.currentTarget,
            tabElement = clickedTab.parentElement.parentElement,
            allTabs = tabElement.querySelectorAll('.tabs .tab'),
            clickedTabIndex = nodeListIndexOf(allTabs, clickedTab),
            allTabBodyElements = tabElement.querySelectorAll('.tab-contents .tab-body');

        for (let i = 0; i < allTabs.length; i++)
        {
            allTabs[i].classList.remove('current');
            allTabBodyElements[i].classList.remove('current');
        }

        allTabs[clickedTabIndex].classList.add('current');
        allTabBodyElements[clickedTabIndex].classList.add('current');
    }
}

new Tblr();