'use strict';

const $ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document),
inputArea = $('#data-input'),
sidebarAreaSelectElements = $$('main > aside select'),
sidebarAreaCheckboxElements = $$('main > aside input[type=checkbox]'),
tabElements = $$('.tab-element .tabs .tab');

function convertInput()
{
	const dataInputElement = $('#data-input'),
        tableData = dataInputElement.value !== '' ? dataInputElement.value.split('\n') : [],
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

function supportTab(event)
{
	if (event.keyCode === 9)
	{
		event.preventDefault();

		const start = this.selectionStart,
        end = this.selectionEnd;

		event.target.value = event.target.value.substring(0, start) + '\t' + event.target.value.substring(end);
		event.target.selectionStart = event.target.selectionEnd = start + 1;
	}
}

function forwardEvents()
{
	const evt = document.createEvent('HTMLEvents');
	evt.initEvent('input', false, true);
	$('#data-input').dispatchEvent(evt);
}

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

function changeTab(event)
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

// EVENTS

inputArea.addEventListener('input', convertInput, false);
inputArea.addEventListener('keydown', supportTab, false);
inputArea.addEventListener('keydown', forwardEvents, false);

for (let i = 0; i < tabElements.length; i++)
{
    tabElements[i].addEventListener('click', changeTab, false);
}

for (let i = 0; i < sidebarAreaSelectElements.length; i++)
{
	sidebarAreaSelectElements[i].addEventListener('change', convertInput, false);
}

for (let i = 0; i < sidebarAreaCheckboxElements.length; i++)
{
	sidebarAreaCheckboxElements[i].addEventListener('click', convertInput, false);
}

// EVENT

convertInput();
