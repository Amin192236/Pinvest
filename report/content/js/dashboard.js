/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 60.43956043956044, "KoPercent": 39.56043956043956};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.4673913043478261, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "https://my.pinvest.ir/auth-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-8"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/auth-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/notification/countUnRead"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/auth-8"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-6"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-3"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-1"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-3"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-3"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-0"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/funds"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-2"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-5"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/funds-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-7"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-8"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/funds-report-6"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-9"], "isController": false}, {"data": [0.0, 500, 1500, "Test"], "isController": true}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/fund/2/balance"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/auth-12"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-10"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-10"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth-11"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/auth/signIn"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-report-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-12"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/funds-13"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/-6"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/-5"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/-4"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-10"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-3"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/-11"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-12"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/funds"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-9"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-13"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-8"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-14"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-7"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/fund/2/history?page=all"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/funds?page=all&size=15"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth/password"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw"], "isController": false}, {"data": [0.5, 500, 1500, "https://my.pinvest.ir/-2"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/profile"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-1"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/-0"], "isController": false}, {"data": [1.0, 500, 1500, "https://my.pinvest.ir/api/v1/checkUser"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/fund/2"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/auth"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/funds-report"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15"], "isController": false}, {"data": [0.0, 500, 1500, "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 91, 36, 39.56043956043956, 592.6813186813187, 56, 8844, 131.0, 1932.9999999999995, 2680.3999999999996, 8844.0, 2.065599818408807, 108.48898926058337, 3.3165662949721937], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["https://my.pinvest.ir/auth-9", 1, 0, 0.0, 1085.0, 1085, 1085, 1085.0, 1085.0, 1085.0, 1085.0, 0.9216589861751152, 39.28391417050691, 0.6615423387096775], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-9", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 2.475792253521127, 16.93166813380282], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-8", 1, 0, 0.0, 74.0, 74, 74, 74.0, 74.0, 74.0, 74.0, 13.513513513513514, 2.388619087837838, 16.258445945945947], "isController": false}, {"data": ["https://my.pinvest.ir/auth-7", 1, 0, 0.0, 1040.0, 1040, 1040, 1040.0, 1040.0, 1040.0, 1040.0, 0.9615384615384616, 72.78207632211539, 0.690166766826923], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/notification/countUnRead", 3, 3, 100.0, 99.66666666666667, 97, 103, 99.0, 103.0, 103.0, 103.0, 0.2535068446848065, 0.3413925183792462, 0.2579630196890316], "isController": false}, {"data": ["https://my.pinvest.ir/auth-8", 1, 0, 0.0, 1067.0, 1067, 1067, 1067.0, 1067.0, 1067.0, 1067.0, 0.9372071227741331, 58.90676253514527, 0.6727023781630741], "isController": false}, {"data": ["https://my.pinvest.ir/auth-5", 1, 1, 100.0, 2662.0, 2662, 2662, 2662.0, 2662.0, 2662.0, 2662.0, 0.3756574004507889, 1.2304247276483846, 0.2718380212246431], "isController": false}, {"data": ["https://my.pinvest.ir/auth-6", 1, 0, 0.0, 2658.0, 2658, 2658, 2658.0, 2658.0, 2658.0, 2658.0, 0.3762227238525207, 1.8583345090293455, 0.2671034377351392], "isController": false}, {"data": ["https://my.pinvest.ir/auth-3", 1, 0, 0.0, 2656.0, 2656, 2656, 2656.0, 2656.0, 2656.0, 2656.0, 0.37650602409638556, 1.276590737951807, 0.2702460231551205], "isController": false}, {"data": ["https://my.pinvest.ir/auth-4", 1, 0, 0.0, 5890.0, 5890, 5890, 5890.0, 5890.0, 5890.0, 5890.0, 0.16977928692699493, 33.98172219864177, 0.1041224533106961], "isController": false}, {"data": ["https://my.pinvest.ir/funds-0", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 130.0, 7.6923076923076925, 14.528245192307692, 8.458533653846153], "isController": false}, {"data": ["https://my.pinvest.ir/auth-1", 1, 0, 0.0, 2658.0, 2658, 2658, 2658.0, 2658.0, 2658.0, 2658.0, 0.3762227238525207, 0.6576549567343868, 0.2682056527464259], "isController": false}, {"data": ["https://my.pinvest.ir/funds-1", 1, 0, 0.0, 154.0, 154, 154, 154.0, 154.0, 154.0, 154.0, 6.493506493506494, 104.57462459415585, 7.133979301948052], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-1", 1, 0, 0.0, 99.0, 99, 99, 99.0, 99.0, 99.0, 99.0, 10.101010101010102, 162.67163825757575, 11.097301136363637], "isController": false}, {"data": ["https://my.pinvest.ir/auth-2", 1, 0, 0.0, 2708.0, 2708, 2708, 2708.0, 2708.0, 2708.0, 2708.0, 0.36927621861152143, 147.67442531388477, 0.2650566608197932], "isController": false}, {"data": ["https://my.pinvest.ir/funds-2", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 131.0, 7.633587786259541, 1.334386927480916, 9.131977576335878], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-0", 1, 0, 0.0, 130.0, 130, 130, 130.0, 130.0, 130.0, 130.0, 7.6923076923076925, 14.528245192307692, 8.511117788461538], "isController": false}, {"data": ["https://my.pinvest.ir/funds-3", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 131.0, 7.633587786259541, 1.3492962786259541, 9.18416030534351], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-3", 1, 0, 0.0, 67.0, 67, 67, 67.0, 67.0, 67.0, 67.0, 14.925373134328359, 2.6381763059701493, 17.957089552238806], "isController": false}, {"data": ["https://my.pinvest.ir/auth-0", 1, 0, 0.0, 2788.0, 2788, 2788, 2788.0, 2788.0, 2788.0, 2788.0, 0.3586800573888092, 5.776360182030129, 0.20946354913916787], "isController": false}, {"data": ["https://my.pinvest.ir/funds", 1, 1, 100.0, 642.0, 642, 642, 642.0, 642.0, 642.0, 642.0, 1.557632398753894, 347.89050330996884, 26.697271709501557], "isController": false}, {"data": ["https://my.pinvest.ir/funds-4", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 131.0, 7.633587786259541, 1.334386927480916, 9.169250954198473], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-2", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 3.013873922413793, 20.62567349137931], "isController": false}, {"data": ["https://my.pinvest.ir/funds-5", 1, 0, 0.0, 303.0, 303, 303, 303.0, 303.0, 303.0, 303.0, 3.3003300330033003, 660.5430074257426, 2.030476485148515], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-5", 1, 0, 0.0, 282.0, 282, 282, 282.0, 282.0, 282.0, 282.0, 3.5460992907801416, 709.732380319149, 2.1816821808510642], "isController": false}, {"data": ["https://my.pinvest.ir/funds-6", 1, 1, 100.0, 132.0, 132, 132, 132.0, 132.0, 132.0, 132.0, 7.575757575757576, 24.81356534090909, 8.507930871212121], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-4", 1, 0, 0.0, 58.0, 58, 58, 58.0, 58.0, 58.0, 58.0, 17.241379310344826, 3.013873922413793, 20.709859913793103], "isController": false}, {"data": ["https://my.pinvest.ir/funds-7", 1, 0, 0.0, 131.0, 131, 131, 131.0, 131.0, 131.0, 131.0, 7.633587786259541, 1.334386927480916, 9.10961354961832], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-7", 1, 0, 0.0, 65.0, 65, 65, 65.0, 65.0, 65.0, 65.0, 15.384615384615385, 2.6893028846153846, 18.359375], "isController": false}, {"data": ["https://my.pinvest.ir/funds-8", 1, 0, 0.0, 128.0, 128, 128, 128.0, 128.0, 128.0, 128.0, 7.8125, 1.38092041015625, 9.3994140625], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-6", 1, 1, 100.0, 111.0, 111, 111, 111.0, 111.0, 111.0, 111.0, 9.00900900900901, 29.50802364864865, 10.117539414414415], "isController": false}, {"data": ["https://my.pinvest.ir/funds-9", 1, 0, 0.0, 157.0, 157, 157, 157.0, 157.0, 157.0, 157.0, 6.369426751592357, 1.119625796178344, 7.656996417197452], "isController": false}, {"data": ["Test", 1, 1, 100.0, 14700.0, 14700, 14700, 14700.0, 14700.0, 14700.0, 14700.0, 0.06802721088435373, 163.94723905187075, 5.828815901360544], "isController": true}, {"data": ["https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", 1, 1, 100.0, 98.0, 98, 98, 98.0, 98.0, 98.0, 98.0, 10.204081632653061, 13.741629464285714, 11.05110012755102], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", 1, 1, 100.0, 107.0, 107, 107, 107.0, 107.0, 107.0, 107.0, 9.345794392523365, 12.585791471962617, 9.875146028037383], "isController": false}, {"data": ["https://my.pinvest.ir/", 1, 1, 100.0, 1561.0, 1561, 1561, 1561.0, 1561.0, 1561.0, 1561.0, 0.6406149903907751, 517.5774993994235, 10.921734865470853], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/fund/2/balance", 3, 3, 100.0, 119.33333333333333, 114, 125, 119.0, 125.0, 125.0, 125.0, 0.2673082063619353, 0.35997853180967654, 0.27070176757551456], "isController": false}, {"data": ["https://my.pinvest.ir/auth-12", 1, 0, 0.0, 1301.0, 1301, 1301, 1301.0, 1301.0, 1301.0, 1301.0, 0.7686395080707148, 0.9030012970791699, 0.5502077728670254], "isController": false}, {"data": ["https://my.pinvest.ir/auth-13", 1, 0, 0.0, 1959.0, 1959, 1959, 1959.0, 1959.0, 1959.0, 1959.0, 0.5104645227156713, 77.98641685809086, 0.37188138080653393], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-10", 1, 0, 0.0, 80.0, 80, 80, 80.0, 80.0, 80.0, 80.0, 12.5, 2.197265625, 15.02685546875], "isController": false}, {"data": ["https://my.pinvest.ir/auth-10", 1, 1, 100.0, 366.0, 366, 366, 366.0, 366.0, 366.0, 366.0, 2.73224043715847, 5.64058230874317, 0.0], "isController": false}, {"data": ["https://my.pinvest.ir/auth-11", 1, 0, 0.0, 1829.0, 1829, 1829, 1829.0, 1829.0, 1829.0, 1829.0, 0.5467468562055768, 80.99008167031165, 0.39137250546746855], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/auth/signIn", 1, 1, 100.0, 59.0, 59, 59, 59.0, 59.0, 59.0, 59.0, 16.949152542372882, 34.4776218220339, 0.0], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-11", 1, 0, 0.0, 96.0, 96, 96, 96.0, 96.0, 96.0, 96.0, 10.416666666666666, 1.8412272135416665, 12.39013671875], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-12", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 1.3917937992125984, 9.45804625984252], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-13", 1, 0, 0.0, 151.0, 151, 151, 151.0, 151.0, 151.0, 151.0, 6.622516556291391, 1.1447123344370862, 7.92891142384106], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-14", 1, 0, 0.0, 148.0, 148, 148, 148.0, 148.0, 148.0, 148.0, 6.756756756756757, 1.194309543918919, 8.201805320945946], "isController": false}, {"data": ["https://my.pinvest.ir/funds-14", 1, 0, 0.0, 71.0, 71, 71, 71.0, 71.0, 71.0, 71.0, 14.084507042253522, 2.4895466549295775, 17.096720950704228], "isController": false}, {"data": ["https://my.pinvest.ir/funds-10", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 1.3841043307086613, 9.465735728346457], "isController": false}, {"data": ["https://my.pinvest.ir/funds-11", 1, 0, 0.0, 162.0, 162, 162, 162.0, 162.0, 162.0, 162.0, 6.172839506172839, 1.0910976080246912, 7.3423032407407405], "isController": false}, {"data": ["https://my.pinvest.ir/funds-12", 1, 0, 0.0, 127.0, 127, 127, 127.0, 127.0, 127.0, 127.0, 7.874015748031496, 1.3917937992125984, 9.45804625984252], "isController": false}, {"data": ["https://my.pinvest.ir/funds-13", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 3.086635044642857, 21.379743303571427], "isController": false}, {"data": ["https://my.pinvest.ir/-6", 1, 1, 100.0, 249.0, 249, 249, 249.0, 249.0, 249.0, 249.0, 4.016064257028112, 13.15417921686747, 4.510228413654619], "isController": false}, {"data": ["https://my.pinvest.ir/-5", 1, 0, 0.0, 540.0, 540, 540, 540.0, 540.0, 540.0, 540.0, 1.8518518518518519, 370.6380208333333, 1.1393229166666665], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", 1, 1, 100.0, 143.0, 143, 143, 143.0, 143.0, 143.0, 143.0, 6.993006993006993, 9.417340472027973, 7.38909527972028], "isController": false}, {"data": ["https://my.pinvest.ir/-4", 1, 0, 0.0, 623.0, 623, 623, 623.0, 623.0, 623.0, 623.0, 1.6051364365971108, 0.2805853731942215, 1.9280447431781702], "isController": false}, {"data": ["https://my.pinvest.ir/-10", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 149.0, 6.7114093959731544, 1.1797399328859062, 8.068110318791947], "isController": false}, {"data": ["https://my.pinvest.ir/-3", 1, 0, 0.0, 151.0, 151, 151, 151.0, 151.0, 151.0, 151.0, 6.622516556291391, 1.1705815397350994, 7.9677152317880795], "isController": false}, {"data": ["https://my.pinvest.ir/-11", 1, 0, 0.0, 727.0, 727, 727, 727.0, 727.0, 727.0, 727.0, 1.375515818431912, 804.3597403713893, 1.5179031980742779], "isController": false}, {"data": ["https://my.pinvest.ir/-12", 1, 0, 0.0, 402.0, 402, 402, 402.0, 402.0, 402.0, 402.0, 2.487562189054726, 0.43969605099502485, 2.98798973880597], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/funds", 3, 3, 100.0, 115.66666666666667, 109, 125, 113.0, 125.0, 125.0, 125.0, 0.25862068965517243, 0.3482792295258621, 0.25963092672413796], "isController": false}, {"data": ["https://my.pinvest.ir/-9", 1, 0, 0.0, 292.0, 292, 292, 292.0, 292.0, 292.0, 292.0, 3.4246575342465753, 0.6019905821917808, 4.116946703767123], "isController": false}, {"data": ["https://my.pinvest.ir/-13", 1, 0, 0.0, 73.0, 73, 73, 73.0, 73.0, 73.0, 73.0, 13.698630136986301, 2.367829623287671, 16.40089897260274], "isController": false}, {"data": ["https://my.pinvest.ir/-8", 1, 0, 0.0, 237.0, 237, 237, 237.0, 237.0, 237.0, 237.0, 4.219409282700422, 0.7458135548523207, 5.076476793248945], "isController": false}, {"data": ["https://my.pinvest.ir/-14", 1, 0, 0.0, 72.0, 72, 72, 72.0, 72.0, 72.0, 72.0, 13.888888888888888, 2.454969618055556, 16.859266493055557], "isController": false}, {"data": ["https://my.pinvest.ir/-7", 1, 0, 0.0, 481.0, 481, 481, 481.0, 481.0, 481.0, 481.0, 2.079002079002079, 0.3634193087318087, 2.4809966216216215], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/fund/2/history?page=all", 1, 1, 100.0, 91.0, 91, 91, 91.0, 91.0, 91.0, 91.0, 10.989010989010989, 14.798677884615385, 11.171445741758243], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/funds?page=all&size=15", 3, 3, 100.0, 108.0, 95, 128, 101.0, 128.0, 128.0, 128.0, 0.251277326409247, 0.3383900714046403, 0.2552035346343915], "isController": false}, {"data": ["https://my.pinvest.ir/auth/password", 1, 1, 100.0, 119.0, 119, 119, 119.0, 119.0, 119.0, 119.0, 8.403361344537815, 17.093946953781515, 0.0], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", 1, 1, 100.0, 113.0, 113, 113, 113.0, 113.0, 113.0, 113.0, 8.849557522123893, 11.917519358407079, 9.601424225663717], "isController": false}, {"data": ["https://my.pinvest.ir/-2", 1, 0, 0.0, 622.0, 622, 622, 622.0, 622.0, 622.0, 622.0, 1.607717041800643, 0.2810364750803859, 1.9232943127009647], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/profile", 3, 3, 100.0, 88.33333333333333, 64, 108, 93.0, 108.0, 108.0, 108.0, 0.2542372881355932, 0.4006389036016949, 0.17048463983050846], "isController": false}, {"data": ["https://my.pinvest.ir/-1", 1, 0, 0.0, 112.0, 112, 112, 112.0, 112.0, 112.0, 112.0, 8.928571428571429, 143.79010881696428, 9.809221540178571], "isController": false}, {"data": ["https://my.pinvest.ir/-0", 1, 0, 0.0, 149.0, 149, 149, 149.0, 149.0, 149.0, 149.0, 6.7114093959731544, 12.675650167785236, 7.347158137583893], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/checkUser", 1, 0, 0.0, 174.0, 174, 174, 174.0, 174.0, 174.0, 174.0, 5.747126436781609, 12.319279813218392, 3.8389008620689657], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/fund/2", 2, 2, 100.0, 135.5, 126, 145, 135.5, 145.0, 145.0, 145.0, 0.8968609865470852, 1.2077844730941705, 0.8968609865470852], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", 1, 1, 100.0, 94.0, 94, 94, 94.0, 94.0, 94.0, 94.0, 10.638297872340425, 14.32637965425532, 11.35513630319149], "isController": false}, {"data": ["https://my.pinvest.ir/auth", 1, 1, 100.0, 8844.0, 8844, 8844, 8844.0, 8844.0, 8844.0, 8844.0, 0.11307100859339665, 126.05474050203529, 1.0281290634893714], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report", 1, 1, 100.0, 537.0, 537, 537, 537.0, 537.0, 537.0, 537.0, 1.86219739292365, 415.9137860800745, 31.930138500931097], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", 1, 1, 100.0, 136.0, 136, 136, 136.0, 136.0, 136.0, 136.0, 7.352941176470588, 9.902056525735293, 7.632984834558823], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", 1, 1, 100.0, 118.0, 118, 118, 118.0, 118.0, 118.0, 118.0, 8.474576271186441, 11.412539724576272, 8.673199152542374], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["401/Unauthorized", 24, 66.66666666666667, 26.373626373626372], "isController": false}, {"data": ["404/Not Found", 4, 11.11111111111111, 4.395604395604396], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 4, 11.11111111111111, 4.395604395604396], "isController": false}, {"data": ["Assertion failed", 4, 11.11111111111111, 4.395604395604396], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 91, 36, "401/Unauthorized", 24, "404/Not Found", 4, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 4, "Assertion failed", 4, "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/notification/countUnRead", 3, 3, "401/Unauthorized", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/auth-5", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/funds", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/funds-6", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report-6", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/fund/2/balance", 3, 3, "401/Unauthorized", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/auth-10", 1, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/auth/signIn", 1, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/-6", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/funds", 3, 3, "401/Unauthorized", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/fund/2/history?page=all", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/funds?page=all&size=15", 3, 3, "401/Unauthorized", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/auth/password", 1, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/profile", 3, 3, "401/Unauthorized", 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: my.pinvest.ir:443 failed to respond", 1, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/fund/2", 2, 2, "401/Unauthorized", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/auth", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/funds-report", 1, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", 1, 1, "401/Unauthorized", 1, "", "", "", "", "", "", "", ""], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
