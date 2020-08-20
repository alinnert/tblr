'use strict'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

function nodeListIndexOf(list, element) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === element) {
      return i
    }
  }

  return -1
}

const tblr = {
  init () {
    tblr.inputArea = $('#data-input')
    tblr.sidebarAreaSelectElements = $$('main > aside select')
    tblr.sidebarAreaCheckboxElements = $$('main > aside input[type=checkbox]')
    tblr.tabElements = $$('.tab-element .tabs .tab')

    tblr.prepareEvents()
    tblr.displayVersion()
    tblr.convertInput()
  },

  get version() { return '1.3.1' },

  prepareEvents () {
    tblr.inputArea.addEventListener(
      'input',
      event => tblr.convertInput(event),
      false
    )
    tblr.inputArea.addEventListener(
      'keydown',
      event => {
        tblr.supportTab(event)
        tblr.forwardEvents(event)
      },
      false
    )

    for (let i = 0; i < tblr.tabElements.length; i++) {
      tblr.tabElements[i].addEventListener(
        'click',
        event => tblr.changeTab(event),
        false
      )
    }

    for (let i = 0; i < tblr.sidebarAreaSelectElements.length; i++) {
      tblr.sidebarAreaSelectElements[i].addEventListener(
        'change',
        event => tblr.convertInput(event),
        false
      )
    }

    for (let i = 0; i < tblr.sidebarAreaCheckboxElements.length; i++) {
      tblr.sidebarAreaCheckboxElements[i].addEventListener(
        'click',
        event => tblr.convertInput(event),
        false
      )
    }
  },

  displayVersion () {
    $('#app-version').innerText = tblr.version
  },

  convertInput () {
    const tableData =
      tblr.inputArea.value !== '' ? tblr.inputArea.value.split('\n') : []
    const settingColumnDelimiterValue = $('#setting-column-delimiter').value
    const oColumnDelimiter = settingColumnDelimiterValue.match(/^rx:/)
      ? new RegExp(settingColumnDelimiterValue.replace(/^rx:/, ''))
      : settingColumnDelimiterValue
    const oFillEmptyCells = $('#setting-fill-empty-cells').checked
    const oIncludeTableElement = $('#setting-include-table-element').checked
    const oFirstRowTh = $('#setting-first-row-th').checked
    const oFirstColTh = $('#setting-first-col-th').checked
    let maxColumnsCount = 0
    let emptyCellsCount = 0
    let rowCounter

    for (rowCounter = 0; rowCounter < tableData.length; rowCounter++) {
      const indent = oIncludeTableElement ? '\t' : ''
      let tableLineData = tableData[rowCounter].split(oColumnDelimiter)
      let colCounter
      
      for (colCounter = 0; colCounter < tableLineData.length; colCounter++) {
        if (tableLineData[colCounter] === '') {
          // fill empty cells with &nbsp;
          if (oFillEmptyCells) {
            tableLineData[colCounter] = '&nbsp;'
          }

          emptyCellsCount++
        }

        if (
          (oFirstRowTh && rowCounter === 0) ||
          (oFirstColTh && colCounter === 0)
        ) {
          tableLineData[colCounter] = `<th>${tableLineData[colCounter]}</th>`
        } else {
          tableLineData[colCounter] = `<td>${tableLineData[colCounter]}</td>`
        }
      }

      if (colCounter > maxColumnsCount) {
        maxColumnsCount = colCounter
      }

      const rowHtml = tableLineData.join('')

      tableData[
        rowCounter
      ] = `${indent}<tr>${rowHtml}</tr>`
    }

    const rowsHtml = tableData.join('\n')
    const tableHtml = '<table>\n' + rowsHtml + '\n</table>'
    const noResultText =
      'No data available!\n\nPlease input some data into the textarea on the left.'

    $('#code-output').textContent =
      tableData.length > 0
        ? oIncludeTableElement ? tableHtml : rowsHtml
        : noResultText
    $('#code-preview').innerHTML = tableHtml

    // update information section
    $('#aside-info-lines').innerText = rowCounter
    $('#aside-info-columns').innerText = maxColumnsCount
    $('#aside-info-empty-cells').innerText = emptyCellsCount
  },

  supportTab (event) {
    if (event.keyCode === 9) {
      event.preventDefault()

      const start = event.currentTarget.selectionStart
      const end = event.currentTarget.selectionEnd

      event.currentTarget.value =
        event.currentTarget.value.substring(0, start) +
        '\t' +
        event.currentTarget.value.substring(end)
      event.currentTarget.selectionStart = event.currentTarget.selectionEnd =
        start + 1
    }
  },

  forwardEvents () {
    const evt = document.createEvent('HTMLEvents')

    evt.initEvent('input', false, true)
    tblr.inputArea.dispatchEvent(evt)
  },

  changeTab (event) {
    const clickedTab = event.currentTarget
    const tabElement = clickedTab.parentElement.parentElement
    const allTabs = tabElement.querySelectorAll('.tabs .tab')
    const clickedTabIndex = nodeListIndexOf(allTabs, clickedTab)
    const allTabBodyElements = tabElement.querySelectorAll(
      '.tab-contents .tab-body'
    )

    for (let i = 0; i < allTabs.length; i++) {
      allTabs[i].classList.remove('current')
      allTabBodyElements[i].classList.remove('current')
    }

    allTabs[clickedTabIndex].classList.add('current')
    allTabBodyElements[clickedTabIndex].classList.add('current')
  }
}

tblr.init()
