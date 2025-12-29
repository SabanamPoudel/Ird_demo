// Transactions Page JavaScript

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    // Initialize with all containers hidden
    hideAllContainers();
});

// Load user information
function loadUserInfo() {
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    
    if (loginData.panNumber) {
        document.getElementById('hdnTTpan').value = loginData.panNumber;
        document.getElementById('hdnTTusername').value = loginData.username || loginData.panNumber;
    }
}

// Hide all transaction containers
function hideAllContainers() {
    document.getElementById('cntTTVatRetList').style.display = 'none';
    document.getElementById('cntTTExciseRetList').style.display = 'none';
    document.getElementById('cntTTListVatPayment').style.display = 'none';
    document.getElementById('cntTTListExcisePayment').style.display = 'none';
    document.getElementById('cntTDSContainer').style.display = 'none';
    document.getElementById('cntTTTdsRetList').style.display = 'none';
    document.getElementById('cntTTListTdsPayment').style.display = 'none';
    document.getElementById('cntTTListAssessCont').style.display = 'none';
    document.getElementById('cntTTListInstall').style.display = 'none';
    document.getElementById('container-1263').style.display = 'none';
    document.getElementById('container-1276').style.display = 'none';
}

// Show transaction type based on selection
function showTransactionType() {
    const selectedType = document.getElementById('cboTTApplication').value;
    
    // Hide all containers first
    hideAllContainers();
    
    // Show selected container
    switch(selectedType) {
        case 'vat':
            document.getElementById('cntTTVatRetList').style.display = 'block';
            document.getElementById('cntTTListVatPayment').style.display = 'block';
            loadVATReturns();
            loadPayments();
            break;
        case 'tds':
            document.getElementById('cntTDSContainer').style.display = 'block';
            break;
        case 'it':
            // IT related containers
            break;
        case 'excise':
            document.getElementById('cntTTExciseRetList').style.display = 'block';
            document.getElementById('cntTTListExcisePayment').style.display = 'block';
            loadExciseReturns();
            loadExcisePayments();
            break;
        case 'installment':
            document.getElementById('cntTTListInstall').style.display = 'block';
            loadInstallmentReturns();
            break;
        case 'extension':
            document.getElementById('container-1276').style.display = 'block';
            loadExtensionData();
            break;
        case 'withholdee':
            // Withholdee Information containers
            break;
        case 'education':
            // Education Tax containers
            break;
        case 'health':
            // Health Tax containers
            break;
        case 'software':
            // Enlisted Software containers
            break;
    }
}

// Load VAT Returns
function loadVATReturns() {
    const tbody = document.getElementById('vatReturnsBody');
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    const pan = loginData.panNumber || '610015263';
    const tradeName = loginData.tradeName || 'खाता विजनेश एकेडेमी प्रा.लि.';
    
    // Sample VAT returns data
    const vatReturns = [
        { submissionNo: '800059591624', pan: pan, tradeName: tradeName, submissionDate: '2080.11.24', transactionDate: '2080.11.24', taxYear: '2080', filingPeriod: 'M', period: '10' },
        { submissionNo: '800060192364', pan: pan, tradeName: tradeName, submissionDate: '2080.12.25', transactionDate: '2080.12.25', taxYear: '2080', filingPeriod: 'M', period: '11' },
        { submissionNo: '810060662278', pan: pan, tradeName: tradeName, submissionDate: '2081.01.25', transactionDate: '2081.01.25', taxYear: '2080', filingPeriod: 'M', period: '12' },
        { submissionNo: '810061133575', pan: pan, tradeName: tradeName, submissionDate: '2081.02.25', transactionDate: '2081.02.25', taxYear: '2081', filingPeriod: 'M', period: '1' },
        { submissionNo: '810061756286', pan: pan, tradeName: tradeName, submissionDate: '2081.03.25', transactionDate: '2081.03.25', taxYear: '2081', filingPeriod: 'M', period: '2' },
        { submissionNo: '810062855702', pan: pan, tradeName: tradeName, submissionDate: '2081.04.25', transactionDate: '2081.04.25', taxYear: '2081', filingPeriod: 'M', period: '3' },
        { submissionNo: '810063750267', pan: pan, tradeName: tradeName, submissionDate: '2081.05.25', transactionDate: '2081.05.25', taxYear: '2081', filingPeriod: 'M', period: '4' },
        { submissionNo: '810064906691', pan: pan, tradeName: tradeName, submissionDate: '2081.06.29', transactionDate: '2081.06.29', taxYear: '2081', filingPeriod: 'M', period: '5' },
        { submissionNo: '810065481680', pan: pan, tradeName: tradeName, submissionDate: '2081.07.25', transactionDate: '2081.07.25', taxYear: '2081', filingPeriod: 'M', period: '6' },
        { submissionNo: '810066296458', pan: pan, tradeName: tradeName, submissionDate: '2081.08.25', transactionDate: '2081.08.25', taxYear: '2081', filingPeriod: 'M', period: '7' },
        { submissionNo: '810067303462', pan: pan, tradeName: tradeName, submissionDate: '2081.09.25', transactionDate: '2081.09.25', taxYear: '2081', filingPeriod: 'M', period: '8' },
        { submissionNo: '810068113973', pan: pan, tradeName: tradeName, submissionDate: '2081.10.25', transactionDate: '2081.10.25', taxYear: '2081', filingPeriod: 'M', period: '9' },
        { submissionNo: '810068933917', pan: pan, tradeName: tradeName, submissionDate: '2081.11.25', transactionDate: '2081.11.25', taxYear: '2081', filingPeriod: 'M', period: '10' },
        { submissionNo: '810069794653', pan: pan, tradeName: tradeName, submissionDate: '2081.12.24', transactionDate: '2081.12.24', taxYear: '2081', filingPeriod: 'M', period: '11' },
        { submissionNo: '820070339376', pan: pan, tradeName: tradeName, submissionDate: '2082.01.25', transactionDate: '2082.01.25', taxYear: '2081', filingPeriod: 'M', period: '12' },
        { submissionNo: '820070828315', pan: pan, tradeName: tradeName, submissionDate: '2082.02.25', transactionDate: '2082.02.25', taxYear: '2082', filingPeriod: 'M', period: '1' },
        { submissionNo: '820071391582', pan: pan, tradeName: tradeName, submissionDate: '2082.03.25', transactionDate: '2082.03.25', taxYear: '2082', filingPeriod: 'M', period: '2' }
    ];
    
    let html = '';
    vatReturns.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.submissionNo}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.pan}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.tradeName}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.submissionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.transactionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.taxYear}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.filingPeriod}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.period}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner center-text">
                        <a href="javascript:void(0)" onclick="viewVATReturn('${item.submissionNo}')" class="view-action">👁</a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Load Payments
function loadPayments() {
    const tbody = document.getElementById('paymentsBody');
    
    // Sample payments data
    const payments = [
        { receiptDate: '2080.12.07', paymentType: 'BK', voucherNo: '60948838', amount: '1381' },
        { receiptDate: '2081.08.25', paymentType: 'BK', voucherNo: '73346734', amount: '32823' },
        { receiptDate: '2081.09.25', paymentType: 'BK', voucherNo: '74946552', amount: '14248' },
        { receiptDate: '2081.10.25', paymentType: 'BK', voucherNo: '76610534', amount: '12039' },
        { receiptDate: '2081.11.25', paymentType: 'BK', voucherNo: '78132193', amount: '13556' },
        { receiptDate: '2081.12.25', paymentType: 'BK', voucherNo: '79573747', amount: '12824' },
        { receiptDate: '2082.01.25', paymentType: 'BK', voucherNo: '81027363', amount: '6568' }
    ];
    
    let html = '';
    payments.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.receiptDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.paymentType}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.voucherNo}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner">${item.amount}</div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Load TDS Returns
function loadTDSReturns() {
    const tbody = document.getElementById('tdsReturnsBody');
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    const pan = loginData.panNumber || '610015263';
    const tradeName = loginData.tradeName || 'खाता विजनेश एकेडेमी प्रा.लि.';
    
    // Sample TDS returns data
    const tdsReturns = [
        { submissionNo: '800059591625', pan: pan, tradeName: tradeName, submissionDate: '2080.11.24', transactionDate: '2080.11.24', taxYear: '2080', filingPeriod: 'M', period: '10' },
        { submissionNo: '800060192365', pan: pan, tradeName: tradeName, submissionDate: '2080.12.25', transactionDate: '2080.12.25', taxYear: '2080', filingPeriod: 'M', period: '11' },
        { submissionNo: '810060662279', pan: pan, tradeName: tradeName, submissionDate: '2081.01.25', transactionDate: '2081.01.25', taxYear: '2080', filingPeriod: 'M', period: '12' },
        { submissionNo: '810061133576', pan: pan, tradeName: tradeName, submissionDate: '2081.02.25', transactionDate: '2081.02.25', taxYear: '2081', filingPeriod: 'M', period: '1' },
        { submissionNo: '810061756287', pan: pan, tradeName: tradeName, submissionDate: '2081.03.25', transactionDate: '2081.03.25', taxYear: '2081', filingPeriod: 'M', period: '2' },
        { submissionNo: '810062855703', pan: pan, tradeName: tradeName, submissionDate: '2081.04.25', transactionDate: '2081.04.25', taxYear: '2081', filingPeriod: 'M', period: '3' },
        { submissionNo: '810063750268', pan: pan, tradeName: tradeName, submissionDate: '2081.05.25', transactionDate: '2081.05.25', taxYear: '2081', filingPeriod: 'M', period: '4' },
        { submissionNo: '810064906692', pan: pan, tradeName: tradeName, submissionDate: '2081.06.29', transactionDate: '2081.06.29', taxYear: '2081', filingPeriod: 'M', period: '5' },
        { submissionNo: '810065481681', pan: pan, tradeName: tradeName, submissionDate: '2081.07.25', transactionDate: '2081.07.25', taxYear: '2081', filingPeriod: 'M', period: '6' },
        { submissionNo: '810066296459', pan: pan, tradeName: tradeName, submissionDate: '2081.08.25', transactionDate: '2081.08.25', taxYear: '2081', filingPeriod: 'M', period: '7' },
        { submissionNo: '810067303463', pan: pan, tradeName: tradeName, submissionDate: '2081.09.25', transactionDate: '2081.09.25', taxYear: '2081', filingPeriod: 'M', period: '8' },
        { submissionNo: '810068113974', pan: pan, tradeName: tradeName, submissionDate: '2081.10.25', transactionDate: '2081.10.25', taxYear: '2081', filingPeriod: 'M', period: '9' },
        { submissionNo: '810068933918', pan: pan, tradeName: tradeName, submissionDate: '2081.11.25', transactionDate: '2081.11.25', taxYear: '2081', filingPeriod: 'M', period: '10' },
        { submissionNo: '810069794654', pan: pan, tradeName: tradeName, submissionDate: '2081.12.24', transactionDate: '2081.12.24', taxYear: '2081', filingPeriod: 'M', period: '11' },
        { submissionNo: '820070339377', pan: pan, tradeName: tradeName, submissionDate: '2082.01.25', transactionDate: '2082.01.25', taxYear: '2081', filingPeriod: 'M', period: '12' },
        { submissionNo: '820070828316', pan: pan, tradeName: tradeName, submissionDate: '2082.02.25', transactionDate: '2082.02.25', taxYear: '2082', filingPeriod: 'M', period: '1' },
        { submissionNo: '820071391583', pan: pan, tradeName: tradeName, submissionDate: '2082.03.25', transactionDate: '2082.03.25', taxYear: '2082', filingPeriod: 'M', period: '2' }
    ];
    
    let html = '';
    tdsReturns.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.submissionNo}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.pan}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.tradeName}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.submissionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.transactionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.taxYear}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.filingPeriod}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.period}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner center-text">
                        <a href="javascript:void(0)" onclick="viewTDSReturn('${item.submissionNo}')" class="view-action">👁</a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Load TDS Payments
function loadTDSPayments() {
    const tbody = document.getElementById('tdsPaymentsBody');
    
    // Sample TDS payments data
    const tdsPayments = [
        { receiptDate: '2080.12.08', paymentTypeCode: 'BK', voucherNo: '60948839', amount: '1382' },
        { receiptDate: '2081.08.26', paymentTypeCode: 'BK', voucherNo: '73346735', amount: '32824' },
        { receiptDate: '2081.09.26', paymentTypeCode: 'BK', voucherNo: '74946553', amount: '14249' },
        { receiptDate: '2081.10.26', paymentTypeCode: 'BK', voucherNo: '76610535', amount: '12040' },
        { receiptDate: '2081.11.26', paymentTypeCode: 'BK', voucherNo: '78132194', amount: '13557' },
        { receiptDate: '2081.12.26', paymentTypeCode: 'BK', voucherNo: '79573748', amount: '12825' },
        { receiptDate: '2082.01.26', paymentTypeCode: 'BK', voucherNo: '81027364', amount: '6569' }
    ];
    
    let html = '';
    tdsPayments.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.receiptDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.paymentTypeCode}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.voucherNo}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner">${item.amount}</div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// View TDS Return details
function viewTDSReturn(submissionNo) {
    window.open('CommonReportViewer.pdf', '_blank');
}

// Search TDS Transactions
function searchTDSTransactions() {
    const fromDate = document.getElementById('tdsFromDate').value;
    const toDate = document.getElementById('tdsToDate').value;
    
    if (!fromDate || !toDate) {
        alert('कृपया देखि र सम्म मिति भर्नुहोस्। (Please enter From and To dates)');
        return;
    }
    
    // Show the TDS results
    document.getElementById('cntTTTdsRetList').style.display = 'block';
    document.getElementById('cntTTListTdsPayment').style.display = 'block';
    
    // Load the data
    loadTDSReturns();
    loadTDSPayments();
}

// Clear TDS Search
function clearTDSSearch() {
    document.getElementById('tdsFromDate').value = '';
    document.getElementById('tdsToDate').value = '';
    document.getElementById('tdsCalendarType').value = 'BS';
    document.getElementById('cntTTTdsRetList').style.display = 'none';
    document.getElementById('cntTTListTdsPayment').style.display = 'none';
}

// Load Excise Returns
function loadExciseReturns() {
    const tbody = document.getElementById('exciseReturnsBody');
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    const pan = loginData.panNumber || '610015263';
    const tradeName = loginData.tradeName || 'खाता विजनेश एकेडेमी प्रा.लि.';
    
    // Sample Excise returns data
    const exciseReturns = [
        { submissionNo: '800059591626', pan: pan, tradeName: tradeName, submissionDate: '2080.11.24', transactionDate: '2080.11.24', taxYear: '2080', filingPeriod: 'M', period: '10' },
        { submissionNo: '800060192366', pan: pan, tradeName: tradeName, submissionDate: '2080.12.25', transactionDate: '2080.12.25', taxYear: '2080', filingPeriod: 'M', period: '11' },
        { submissionNo: '810060662280', pan: pan, tradeName: tradeName, submissionDate: '2081.01.25', transactionDate: '2081.01.25', taxYear: '2080', filingPeriod: 'M', period: '12' },
        { submissionNo: '810061133577', pan: pan, tradeName: tradeName, submissionDate: '2081.02.25', transactionDate: '2081.02.25', taxYear: '2081', filingPeriod: 'M', period: '1' },
        { submissionNo: '810061756288', pan: pan, tradeName: tradeName, submissionDate: '2081.03.25', transactionDate: '2081.03.25', taxYear: '2081', filingPeriod: 'M', period: '2' },
        { submissionNo: '810062855704', pan: pan, tradeName: tradeName, submissionDate: '2081.04.25', transactionDate: '2081.04.25', taxYear: '2081', filingPeriod: 'M', period: '3' },
        { submissionNo: '810063750269', pan: pan, tradeName: tradeName, submissionDate: '2081.05.25', transactionDate: '2081.05.25', taxYear: '2081', filingPeriod: 'M', period: '4' },
        { submissionNo: '810064906693', pan: pan, tradeName: tradeName, submissionDate: '2081.06.29', transactionDate: '2081.06.29', taxYear: '2081', filingPeriod: 'M', period: '5' },
        { submissionNo: '810065481682', pan: pan, tradeName: tradeName, submissionDate: '2081.07.25', transactionDate: '2081.07.25', taxYear: '2081', filingPeriod: 'M', period: '6' },
        { submissionNo: '810066296460', pan: pan, tradeName: tradeName, submissionDate: '2081.08.25', transactionDate: '2081.08.25', taxYear: '2081', filingPeriod: 'M', period: '7' },
        { submissionNo: '810067303464', pan: pan, tradeName: tradeName, submissionDate: '2081.09.25', transactionDate: '2081.09.25', taxYear: '2081', filingPeriod: 'M', period: '8' },
        { submissionNo: '810068113975', pan: pan, tradeName: tradeName, submissionDate: '2081.10.25', transactionDate: '2081.10.25', taxYear: '2081', filingPeriod: 'M', period: '9' },
        { submissionNo: '810068933919', pan: pan, tradeName: tradeName, submissionDate: '2081.11.25', transactionDate: '2081.11.25', taxYear: '2081', filingPeriod: 'M', period: '10' },
        { submissionNo: '810069794655', pan: pan, tradeName: tradeName, submissionDate: '2081.12.24', transactionDate: '2081.12.24', taxYear: '2081', filingPeriod: 'M', period: '11' },
        { submissionNo: '820070339378', pan: pan, tradeName: tradeName, submissionDate: '2082.01.25', transactionDate: '2082.01.25', taxYear: '2081', filingPeriod: 'M', period: '12' },
        { submissionNo: '820070828317', pan: pan, tradeName: tradeName, submissionDate: '2082.02.25', transactionDate: '2082.02.25', taxYear: '2082', filingPeriod: 'M', period: '1' },
        { submissionNo: '820071391584', pan: pan, tradeName: tradeName, submissionDate: '2082.03.25', transactionDate: '2082.03.25', taxYear: '2082', filingPeriod: 'M', period: '2' }
    ];
    
    let html = '';
    exciseReturns.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.submissionNo}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.pan}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.tradeName}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.submissionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.transactionDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.taxYear}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.filingPeriod}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.period}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner center-text">
                        <a href="javascript:void(0)" onclick="viewExciseReturn('${item.submissionNo}')" class="view-action">👁</a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Load Excise Payments
function loadExcisePayments() {
    const tbody = document.getElementById('excisePaymentsBody');
    
    // Sample Excise payments data
    const excisePayments = [
        { receiptDate: '2080.12.09', paymentTypeCode: 'BK', voucherNo: '60948840', amount: '1383' },
        { receiptDate: '2081.08.27', paymentTypeCode: 'BK', voucherNo: '73346736', amount: '32825' },
        { receiptDate: '2081.09.27', paymentTypeCode: 'BK', voucherNo: '74946554', amount: '14250' },
        { receiptDate: '2081.10.27', paymentTypeCode: 'BK', voucherNo: '76610536', amount: '12041' },
        { receiptDate: '2081.11.27', paymentTypeCode: 'BK', voucherNo: '78132195', amount: '13558' },
        { receiptDate: '2081.12.27', paymentTypeCode: 'BK', voucherNo: '79573749', amount: '12826' },
        { receiptDate: '2082.01.27', paymentTypeCode: 'BK', voucherNo: '81027365', amount: '6570' }
    ];
    
    let html = '';
    excisePayments.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.receiptDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.paymentTypeCode}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.voucherNo}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner">${item.amount}</div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// View Excise Return details
function viewExciseReturn(submissionNo) {
    window.open('CommonReportViewer.pdf', '_blank');
}

// Load Installment Returns
function loadInstallmentReturns() {
    const tbody = document.getElementById('installmentBody');
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    const pan = loginData.panNumber || '610015263';
    
    // Sample Installment returns data
    const installmentReturns = [
        { pan: pan, fiscalYear: '2080/81', submissionNumber: '900012345671', filingDate: '2080.08.15' },
        { pan: pan, fiscalYear: '2080/81', submissionNumber: '900012345672', filingDate: '2080.09.15' },
        { pan: pan, fiscalYear: '2080/81', submissionNumber: '900012345673', filingDate: '2080.10.15' },
        { pan: pan, fiscalYear: '2081/82', submissionNumber: '900012345674', filingDate: '2081.08.15' },
        { pan: pan, fiscalYear: '2081/82', submissionNumber: '900012345675', filingDate: '2081.09.15' },
        { pan: pan, fiscalYear: '2081/82', submissionNumber: '900012345676', filingDate: '2081.10.15' }
    ];
    
    let html = '';
    installmentReturns.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.pan}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.fiscalYear}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.submissionNumber}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.filingDate}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner center-text">
                        <a href="javascript:void(0)" onclick="viewInstallment('${item.submissionNumber}')" class="view-action">👁</a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Load Extension Data
function loadExtensionData() {
    const tbody = document.getElementById('extensionBody');
    const loginData = JSON.parse(localStorage.getItem('lastLoginAttempt') || '{}');
    const pan = loginData.panNumber || '610015263';
    
    // Sample Extension data
    const extensionData = [
        { fiscalYear: '2080/81', applicationDate: '2081.04.15', extendedUpto: '2081.07.15', pan: pan, officeCode: '301' },
        { fiscalYear: '2081/82', applicationDate: '2082.04.15', extendedUpto: '2082.07.15', pan: pan, officeCode: '301' }
    ];
    
    let html = '';
    extensionData.forEach((item, index) => {
        const rowClass = index % 2 === 1 ? ' x-grid-row-alt' : '';
        html += `
            <tr class="x-grid-row${rowClass}">
                <td class="x-grid-cell x-grid-cell-first">
                    <div class="x-grid-cell-inner">${item.fiscalYear}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.applicationDate}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.extendedUpto}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.pan}</div>
                </td>
                <td class="x-grid-cell">
                    <div class="x-grid-cell-inner">${item.officeCode}</div>
                </td>
                <td class="x-grid-cell x-grid-cell-last">
                    <div class="x-grid-cell-inner center-text">
                        <a href="javascript:void(0)" onclick="viewExtension('${item.fiscalYear}')" class="view-action">👁</a>
                    </div>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// View Installment details
function viewInstallment(submissionNo) {
    window.open('CommonReportViewer.pdf', '_blank');
}

// View Extension details
function viewExtension(fiscalYear) {
    window.open('CommonReportViewer.pdf', '_blank');
}

// View VAT Return details
function viewVATReturn(submissionNo) {
    window.open('CommonReportViewer.pdf', '_blank');
}

// Go back to dashboard
function goBack() {
    window.location.href = 'taxpayer_dashboard.html';
}

// Clear selection
function clearSelection() {
    document.getElementById('cboTTApplication').value = '';
    hideAllContainers();
}

console.log('Transactions page loaded');
