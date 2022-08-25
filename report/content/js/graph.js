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
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 3.0, "series": [{"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead", "isController": false}, {"data": [[1000.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3", "isController": false}, {"data": [[5800.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0", "isController": false}, {"data": [[2600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3", "isController": false}, {"data": [[2700.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9", "isController": false}, {"data": [[14700.0, 1.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", "isController": false}, {"data": [[1500.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance", "isController": false}, {"data": [[1300.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12", "isController": false}, {"data": [[1900.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10", "isController": false}, {"data": [[300.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10", "isController": false}, {"data": [[1800.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3", "isController": false}, {"data": [[700.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12", "isController": false}, {"data": [[100.0, 3.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13", "isController": false}, {"data": [[200.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14", "isController": false}, {"data": [[400.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all", "isController": false}, {"data": [[0.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", "isController": false}, {"data": [[600.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2", "isController": false}, {"data": [[0.0, 2.0], [100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser", "isController": false}, {"data": [[100.0, 2.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2", "isController": false}, {"data": [[0.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[8800.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth", "isController": false}, {"data": [[500.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", "isController": false}, {"data": [[100.0, 1.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 14700.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 8.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 39.0, "series": [{"data": [[0.0, 39.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 8.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 8.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 36.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 1.0, "minX": 1.66135602E12, "maxY": 1.0, "series": [{"data": [[1.66135602E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66135602E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.0, "maxY": 14700.0, "series": [{"data": [[1.0, 1085.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9", "isController": false}, {"data": [[1.0, 1085.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9-Aggregated", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8", "isController": false}, {"data": [[1.0, 74.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8-Aggregated", "isController": false}, {"data": [[1.0, 1040.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7", "isController": false}, {"data": [[1.0, 1040.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7-Aggregated", "isController": false}, {"data": [[1.0, 99.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead", "isController": false}, {"data": [[1.0, 99.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead-Aggregated", "isController": false}, {"data": [[1.0, 1067.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8", "isController": false}, {"data": [[1.0, 1067.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8-Aggregated", "isController": false}, {"data": [[1.0, 2662.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5", "isController": false}, {"data": [[1.0, 2662.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5-Aggregated", "isController": false}, {"data": [[1.0, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6", "isController": false}, {"data": [[1.0, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6-Aggregated", "isController": false}, {"data": [[1.0, 2656.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3", "isController": false}, {"data": [[1.0, 2656.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3-Aggregated", "isController": false}, {"data": [[1.0, 5890.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4", "isController": false}, {"data": [[1.0, 5890.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0-Aggregated", "isController": false}, {"data": [[1.0, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1", "isController": false}, {"data": [[1.0, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1-Aggregated", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1", "isController": false}, {"data": [[1.0, 154.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1-Aggregated", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1", "isController": false}, {"data": [[1.0, 99.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1-Aggregated", "isController": false}, {"data": [[1.0, 2708.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2", "isController": false}, {"data": [[1.0, 2708.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2-Aggregated", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0", "isController": false}, {"data": [[1.0, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3-Aggregated", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3", "isController": false}, {"data": [[1.0, 67.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3-Aggregated", "isController": false}, {"data": [[1.0, 2788.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0", "isController": false}, {"data": [[1.0, 2788.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0-Aggregated", "isController": false}, {"data": [[1.0, 642.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds", "isController": false}, {"data": [[1.0, 642.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2-Aggregated", "isController": false}, {"data": [[1.0, 303.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5", "isController": false}, {"data": [[1.0, 303.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5-Aggregated", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5", "isController": false}, {"data": [[1.0, 282.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5-Aggregated", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6", "isController": false}, {"data": [[1.0, 132.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6-Aggregated", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4", "isController": false}, {"data": [[1.0, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4-Aggregated", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7", "isController": false}, {"data": [[1.0, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7-Aggregated", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7", "isController": false}, {"data": [[1.0, 65.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7-Aggregated", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8", "isController": false}, {"data": [[1.0, 128.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8-Aggregated", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6", "isController": false}, {"data": [[1.0, 111.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6-Aggregated", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9", "isController": false}, {"data": [[1.0, 157.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9-Aggregated", "isController": false}, {"data": [[1.0, 14700.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.0, 14700.0]], "isOverall": false, "label": "Test-Aggregated", "isController": true}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", "isController": false}, {"data": [[1.0, 98.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10-Aggregated", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", "isController": false}, {"data": [[1.0, 107.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24-Aggregated", "isController": false}, {"data": [[1.0, 1561.0]], "isOverall": false, "label": "https://my.pinvest.ir/", "isController": false}, {"data": [[1.0, 1561.0]], "isOverall": false, "label": "https://my.pinvest.ir/-Aggregated", "isController": false}, {"data": [[1.0, 119.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance", "isController": false}, {"data": [[1.0, 119.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance-Aggregated", "isController": false}, {"data": [[1.0, 1301.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12", "isController": false}, {"data": [[1.0, 1301.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12-Aggregated", "isController": false}, {"data": [[1.0, 1959.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13", "isController": false}, {"data": [[1.0, 1959.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13-Aggregated", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10", "isController": false}, {"data": [[1.0, 80.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10-Aggregated", "isController": false}, {"data": [[1.0, 366.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10", "isController": false}, {"data": [[1.0, 366.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10-Aggregated", "isController": false}, {"data": [[1.0, 1829.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11", "isController": false}, {"data": [[1.0, 1829.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11-Aggregated", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn", "isController": false}, {"data": [[1.0, 59.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn-Aggregated", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11", "isController": false}, {"data": [[1.0, 96.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12-Aggregated", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13-Aggregated", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14", "isController": false}, {"data": [[1.0, 148.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14-Aggregated", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14", "isController": false}, {"data": [[1.0, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10-Aggregated", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11", "isController": false}, {"data": [[1.0, 162.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11-Aggregated", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12", "isController": false}, {"data": [[1.0, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12-Aggregated", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13", "isController": false}, {"data": [[1.0, 56.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13-Aggregated", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6", "isController": false}, {"data": [[1.0, 249.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6-Aggregated", "isController": false}, {"data": [[1.0, 540.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5", "isController": false}, {"data": [[1.0, 540.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5-Aggregated", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.0, 143.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24-Aggregated", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4", "isController": false}, {"data": [[1.0, 623.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4-Aggregated", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10-Aggregated", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3", "isController": false}, {"data": [[1.0, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3-Aggregated", "isController": false}, {"data": [[1.0, 727.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11", "isController": false}, {"data": [[1.0, 727.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11-Aggregated", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12", "isController": false}, {"data": [[1.0, 402.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12-Aggregated", "isController": false}, {"data": [[1.0, 115.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds", "isController": false}, {"data": [[1.0, 115.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds-Aggregated", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9", "isController": false}, {"data": [[1.0, 292.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9-Aggregated", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13", "isController": false}, {"data": [[1.0, 73.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13-Aggregated", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8", "isController": false}, {"data": [[1.0, 237.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8-Aggregated", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14", "isController": false}, {"data": [[1.0, 72.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14-Aggregated", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7", "isController": false}, {"data": [[1.0, 481.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7-Aggregated", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all", "isController": false}, {"data": [[1.0, 91.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all-Aggregated", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15", "isController": false}, {"data": [[1.0, 108.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15-Aggregated", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password", "isController": false}, {"data": [[1.0, 119.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password-Aggregated", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", "isController": false}, {"data": [[1.0, 113.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw-Aggregated", "isController": false}, {"data": [[1.0, 622.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2", "isController": false}, {"data": [[1.0, 622.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2-Aggregated", "isController": false}, {"data": [[1.0, 88.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile", "isController": false}, {"data": [[1.0, 88.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile-Aggregated", "isController": false}, {"data": [[1.0, 112.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1", "isController": false}, {"data": [[1.0, 112.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1-Aggregated", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0", "isController": false}, {"data": [[1.0, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0-Aggregated", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser", "isController": false}, {"data": [[1.0, 174.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser-Aggregated", "isController": false}, {"data": [[1.0, 135.5]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2", "isController": false}, {"data": [[1.0, 135.5]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2-Aggregated", "isController": false}, {"data": [[1.0, 94.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.0, 94.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24-Aggregated", "isController": false}, {"data": [[1.0, 8844.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth", "isController": false}, {"data": [[1.0, 8844.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-Aggregated", "isController": false}, {"data": [[1.0, 537.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report", "isController": false}, {"data": [[1.0, 537.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-Aggregated", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", "isController": false}, {"data": [[1.0, 136.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15-Aggregated", "isController": false}, {"data": [[1.0, 118.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", "isController": false}, {"data": [[1.0, 118.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 1.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2493.633333333333, "minX": 1.66135602E12, "maxY": 81569.83333333333, "series": [{"data": [[1.66135602E12, 81569.83333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66135602E12, 2493.633333333333]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66135602E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.66135602E12, "maxY": 14700.0, "series": [{"data": [[1.66135602E12, 1085.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9", "isController": false}, {"data": [[1.66135602E12, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9", "isController": false}, {"data": [[1.66135602E12, 74.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8", "isController": false}, {"data": [[1.66135602E12, 1040.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7", "isController": false}, {"data": [[1.66135602E12, 99.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead", "isController": false}, {"data": [[1.66135602E12, 1067.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8", "isController": false}, {"data": [[1.66135602E12, 2662.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5", "isController": false}, {"data": [[1.66135602E12, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6", "isController": false}, {"data": [[1.66135602E12, 2656.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3", "isController": false}, {"data": [[1.66135602E12, 5890.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4", "isController": false}, {"data": [[1.66135602E12, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0", "isController": false}, {"data": [[1.66135602E12, 2658.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1", "isController": false}, {"data": [[1.66135602E12, 154.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1", "isController": false}, {"data": [[1.66135602E12, 99.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1", "isController": false}, {"data": [[1.66135602E12, 2708.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2", "isController": false}, {"data": [[1.66135602E12, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2", "isController": false}, {"data": [[1.66135602E12, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0", "isController": false}, {"data": [[1.66135602E12, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3", "isController": false}, {"data": [[1.66135602E12, 67.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3", "isController": false}, {"data": [[1.66135602E12, 2788.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0", "isController": false}, {"data": [[1.66135602E12, 642.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds", "isController": false}, {"data": [[1.66135602E12, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4", "isController": false}, {"data": [[1.66135602E12, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2", "isController": false}, {"data": [[1.66135602E12, 303.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5", "isController": false}, {"data": [[1.66135602E12, 282.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5", "isController": false}, {"data": [[1.66135602E12, 132.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6", "isController": false}, {"data": [[1.66135602E12, 58.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4", "isController": false}, {"data": [[1.66135602E12, 131.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7", "isController": false}, {"data": [[1.66135602E12, 65.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7", "isController": false}, {"data": [[1.66135602E12, 128.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8", "isController": false}, {"data": [[1.66135602E12, 111.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6", "isController": false}, {"data": [[1.66135602E12, 157.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9", "isController": false}, {"data": [[1.66135602E12, 14700.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66135602E12, 98.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", "isController": false}, {"data": [[1.66135602E12, 107.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 1561.0]], "isOverall": false, "label": "https://my.pinvest.ir/", "isController": false}, {"data": [[1.66135602E12, 119.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance", "isController": false}, {"data": [[1.66135602E12, 1301.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12", "isController": false}, {"data": [[1.66135602E12, 1959.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13", "isController": false}, {"data": [[1.66135602E12, 80.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10", "isController": false}, {"data": [[1.66135602E12, 366.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10", "isController": false}, {"data": [[1.66135602E12, 1829.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11", "isController": false}, {"data": [[1.66135602E12, 59.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn", "isController": false}, {"data": [[1.66135602E12, 96.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11", "isController": false}, {"data": [[1.66135602E12, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12", "isController": false}, {"data": [[1.66135602E12, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13", "isController": false}, {"data": [[1.66135602E12, 148.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14", "isController": false}, {"data": [[1.66135602E12, 71.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14", "isController": false}, {"data": [[1.66135602E12, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10", "isController": false}, {"data": [[1.66135602E12, 162.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11", "isController": false}, {"data": [[1.66135602E12, 127.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12", "isController": false}, {"data": [[1.66135602E12, 56.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13", "isController": false}, {"data": [[1.66135602E12, 249.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6", "isController": false}, {"data": [[1.66135602E12, 540.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5", "isController": false}, {"data": [[1.66135602E12, 143.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 623.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4", "isController": false}, {"data": [[1.66135602E12, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10", "isController": false}, {"data": [[1.66135602E12, 151.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3", "isController": false}, {"data": [[1.66135602E12, 727.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11", "isController": false}, {"data": [[1.66135602E12, 402.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12", "isController": false}, {"data": [[1.66135602E12, 115.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds", "isController": false}, {"data": [[1.66135602E12, 292.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9", "isController": false}, {"data": [[1.66135602E12, 73.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13", "isController": false}, {"data": [[1.66135602E12, 237.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8", "isController": false}, {"data": [[1.66135602E12, 72.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14", "isController": false}, {"data": [[1.66135602E12, 481.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7", "isController": false}, {"data": [[1.66135602E12, 91.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all", "isController": false}, {"data": [[1.66135602E12, 108.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15", "isController": false}, {"data": [[1.66135602E12, 119.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password", "isController": false}, {"data": [[1.66135602E12, 113.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", "isController": false}, {"data": [[1.66135602E12, 622.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2", "isController": false}, {"data": [[1.66135602E12, 88.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile", "isController": false}, {"data": [[1.66135602E12, 112.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1", "isController": false}, {"data": [[1.66135602E12, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0", "isController": false}, {"data": [[1.66135602E12, 174.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser", "isController": false}, {"data": [[1.66135602E12, 135.5]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2", "isController": false}, {"data": [[1.66135602E12, 94.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 8844.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth", "isController": false}, {"data": [[1.66135602E12, 537.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report", "isController": false}, {"data": [[1.66135602E12, 136.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", "isController": false}, {"data": [[1.66135602E12, 118.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66135602E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66135602E12, "maxY": 6043.0, "series": [{"data": [[1.66135602E12, 1075.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8", "isController": false}, {"data": [[1.66135602E12, 872.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7", "isController": false}, {"data": [[1.66135602E12, 99.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead", "isController": false}, {"data": [[1.66135602E12, 946.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8", "isController": false}, {"data": [[1.66135602E12, 2661.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5", "isController": false}, {"data": [[1.66135602E12, 2657.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6", "isController": false}, {"data": [[1.66135602E12, 2656.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3", "isController": false}, {"data": [[1.66135602E12, 5439.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4", "isController": false}, {"data": [[1.66135602E12, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0", "isController": false}, {"data": [[1.66135602E12, 2657.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1", "isController": false}, {"data": [[1.66135602E12, 153.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1", "isController": false}, {"data": [[1.66135602E12, 98.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1", "isController": false}, {"data": [[1.66135602E12, 122.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2", "isController": false}, {"data": [[1.66135602E12, 129.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3", "isController": false}, {"data": [[1.66135602E12, 2768.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0", "isController": false}, {"data": [[1.66135602E12, 130.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2", "isController": false}, {"data": [[1.66135602E12, 164.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5", "isController": false}, {"data": [[1.66135602E12, 146.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5", "isController": false}, {"data": [[1.66135602E12, 132.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8", "isController": false}, {"data": [[1.66135602E12, 111.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9", "isController": false}, {"data": [[1.66135602E12, 6043.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66135602E12, 98.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", "isController": false}, {"data": [[1.66135602E12, 107.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/", "isController": false}, {"data": [[1.66135602E12, 119.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance", "isController": false}, {"data": [[1.66135602E12, 1301.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12", "isController": false}, {"data": [[1.66135602E12, 1467.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10", "isController": false}, {"data": [[1.66135602E12, 85.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13", "isController": false}, {"data": [[1.66135602E12, 248.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6", "isController": false}, {"data": [[1.66135602E12, 248.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5", "isController": false}, {"data": [[1.66135602E12, 143.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3", "isController": false}, {"data": [[1.66135602E12, 118.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12", "isController": false}, {"data": [[1.66135602E12, 115.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7", "isController": false}, {"data": [[1.66135602E12, 91.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all", "isController": false}, {"data": [[1.66135602E12, 107.33333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password", "isController": false}, {"data": [[1.66135602E12, 113.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2", "isController": false}, {"data": [[1.66135602E12, 66.66666666666667]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile", "isController": false}, {"data": [[1.66135602E12, 111.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1", "isController": false}, {"data": [[1.66135602E12, 149.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0", "isController": false}, {"data": [[1.66135602E12, 174.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser", "isController": false}, {"data": [[1.66135602E12, 135.5]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2", "isController": false}, {"data": [[1.66135602E12, 94.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 2768.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth", "isController": false}, {"data": [[1.66135602E12, 129.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report", "isController": false}, {"data": [[1.66135602E12, 136.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", "isController": false}, {"data": [[1.66135602E12, 117.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66135602E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.66135602E12, "maxY": 3759.0, "series": [{"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8", "isController": false}, {"data": [[1.66135602E12, 2158.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5", "isController": false}, {"data": [[1.66135602E12, 2157.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6", "isController": false}, {"data": [[1.66135602E12, 2158.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3", "isController": false}, {"data": [[1.66135602E12, 3759.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0", "isController": false}, {"data": [[1.66135602E12, 2158.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3", "isController": false}, {"data": [[1.66135602E12, 2547.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9", "isController": false}, {"data": [[1.66135602E12, 2547.0]], "isOverall": false, "label": "Test", "isController": true}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-6", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-5", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 551.0]], "isOverall": false, "label": "https://my.pinvest.ir/-4", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-10", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-3", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-11", "isController": false}, {"data": [[1.66135602E12, 283.0]], "isOverall": false, "label": "https://my.pinvest.ir/-12", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-9", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-13", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-8", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-14", "isController": false}, {"data": [[1.66135602E12, 182.0]], "isOverall": false, "label": "https://my.pinvest.ir/-7", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw", "isController": false}, {"data": [[1.66135602E12, 541.0]], "isOverall": false, "label": "https://my.pinvest.ir/-2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-1", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/-0", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24", "isController": false}, {"data": [[1.66135602E12, 2547.0]], "isOverall": false, "label": "https://my.pinvest.ir/auth", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15", "isController": false}, {"data": [[1.66135602E12, 0.0]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66135602E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 56.0, "minX": 1.66135602E12, "maxY": 5890.0, "series": [{"data": [[1.66135602E12, 5890.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66135602E12, 2656.8]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66135602E12, 5890.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66135602E12, 2723.9999999999995]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66135602E12, 56.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66135602E12, 151.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66135602E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 88.0, "minX": 1.0, "maxY": 5753.0, "series": [{"data": [[1.0, 2044.5], [4.0, 1067.0], [2.0, 130.5], [17.0, 88.0], [9.0, 727.0], [19.0, 131.0], [5.0, 2657.0], [12.0, 292.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 366.0], [2.0, 89.0], [8.0, 98.5], [17.0, 111.0], [9.0, 113.0], [19.0, 128.0], [5.0, 5753.0], [12.0, 249.0], [3.0, 125.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 19.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 2714.5, "series": [{"data": [[1.0, 2034.5], [4.0, 946.0], [2.0, 130.0], [17.0, 0.0], [9.0, 118.0], [19.0, 0.0], [5.0, 2061.5], [12.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[4.0, 0.0], [2.0, 0.0], [8.0, 98.5], [17.0, 111.0], [9.0, 113.0], [19.0, 128.0], [5.0, 2714.5], [12.0, 248.0], [3.0, 124.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 19.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1.5166666666666666, "minX": 1.66135602E12, "maxY": 1.5166666666666666, "series": [{"data": [[1.66135602E12, 1.5166666666666666]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66135602E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.66135602E12, "maxY": 0.5333333333333333, "series": [{"data": [[1.66135602E12, 0.4]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66135602E12, 0.4]], "isOverall": false, "label": "401", "isController": false}, {"data": [[1.66135602E12, 0.5333333333333333]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66135602E12, 0.06666666666666667]], "isOverall": false, "label": "404", "isController": false}, {"data": [[1.66135602E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66135602E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66135602E12, "maxY": 0.05, "series": [{"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-5-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-2-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth/password-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-9-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-4-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-7-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-13-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-13-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-0-success", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/profile-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-11-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-1-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-08-18&to_date=2022-08-24-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-6-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-8-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-11-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-11-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-3-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-13-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-8-success", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/notification/countUnRead-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-6-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-13-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-0-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2/history?page=all-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-14-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-0-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-2-success", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/funds?page=all&size=15-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/profit?page=all&size=10&from_date=2022-07-25&to_date=2022-08-24-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-4-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-9-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-4-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "Test-failure", "isController": true}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-7-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/list/fund/2?from_date=2022-07-25&to_date=2022-08-24&type=pending&page=1&size=10-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-2-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-11-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-3-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-6-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards?page=all&sort_by=name&size=15-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-10-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/fund/2?from_date=2022-07-25&to_date=2022-08-24-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-14-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-12-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-1-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-4-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-12-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-5-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-14-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-8-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-10-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-10-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-5-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/checkUser-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-6-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-2-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-7-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-0-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-10-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/bank/cards/undefined/fund-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-7-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-12-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-9-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-9-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-12-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/report/chart/transaction/undefined?from_date=2022-07-25&to_date=2022-08-24&type=withdraw-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-1-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-1-success", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/fund/2/balance-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-3-success", "isController": false}, {"data": [[1.66135602E12, 0.03333333333333333]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/fund/2-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/-5-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/auth/signIn-failure", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/auth-3-success", "isController": false}, {"data": [[1.66135602E12, 0.016666666666666666]], "isOverall": false, "label": "https://my.pinvest.ir/funds-report-8-success", "isController": false}, {"data": [[1.66135602E12, 0.05]], "isOverall": false, "label": "https://my.pinvest.ir/api/v1/user/funds-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66135602E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.6166666666666667, "minX": 1.66135602E12, "maxY": 0.9166666666666666, "series": [{"data": [[1.66135602E12, 0.9166666666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66135602E12, 0.6166666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66135602E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 16200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
