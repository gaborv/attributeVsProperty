
$("#startBtn").click(function () {
    $()
        .promise()
        .then(function () { $("#startCell").children().toggle(); })
        .then(delay(500))
        .then(function () { testString(); })
        .then(delay(500))
        .then(function () { testBool(); })
        .then(delay(500))
        .then(function () { testIntMaxlength(); })
        .then(delay(500))
        .then(function () { testIntMaxlength2(); })
        .then(delay(500))
        .then(function () { testIntColspan(); })
        .then(function () { $("#startCell").children().toggle(); });
});

function delay(time) {
    return function () {
        console.log("Delaying");
        var ret = new $.Deferred();
        setTimeout(function () {
            ret.resolve();
        }, time);
        return ret;
    };
}


testString = function () {
    var setStringSuit = new Benchmark.Suite;
    setStringSuit
        .add('SetString#Attribute', function () {
            var testTable = document.getElementById('testTable');
            testTable.setAttribute("summary", "Just some summary we are going to remove");
            testTable.removeAttribute("summary");
        })
        .add('SetString#Property', function () {
            var testTable = document.getElementById('testTable');
            testTable.summary = "Just some summary we are going to remove.";
            testTable.summary = "summary";
        })
        .add('SetString#Mixed', function () {
            var testTable = document.getElementById('testTable');
            testTable.summary = "Just some summary we are going to remove";
            testTable.removeAttribute("summary");
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));

            var attrPerf = 1 / this[0].stats.mean;
            var mixdPerf = 1 / this[2].stats.mean;
            var propPerf = 1 / this[1].stats.mean;

            var mixdVsAttr = (mixdPerf - attrPerf) / attrPerf;
            var propVsMixd = (propPerf - mixdPerf) / mixdPerf;

            $('#testResults tr:last').after(
                '<tr>'
                + '<th>Setting and removing table.summary [string]</th>'
                + '<td class="numeric">' + numeral(attrPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[0].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(mixdVsAttr).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(mixdPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[2].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(propVsMixd).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(propPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[1].stats.rme).format('0.00') + '%</td>'
                + '</tr>');
        })
        .run({ 'async': false });
}



testBool = function () {
    var boolSuit = new Benchmark.Suite;
    boolSuit
        .add('SetBool#Attribute', function () {
            var hiddenRow = document.getElementById('hiddenRow');
            hiddenRow.removeAttribute("hidden");
            hiddenRow.setAttribute("hidden", "hidden");
        })
        .add('SetBool#Property', function () {
            var hiddenRow = document.getElementById('hiddenRow');
            hiddenRow.hidden = "";
            hiddenRow.hidden = "true";
        })
        .add('SetString#Mixed', function () {
            var hiddenRow = document.getElementById('hiddenRow');
            hiddenRow.removeAttribute("hidden");
            hiddenRow.hidden = "true";
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));

            var attrPerf = 1 / this[0].stats.mean;
            var mixdPerf = 1 / this[2].stats.mean;
            var propPerf = 1 / this[1].stats.mean;

            var mixdVsAttr = (mixdPerf - attrPerf) / attrPerf;
            var propVsMixd = (propPerf - mixdPerf) / mixdPerf;

            $('#testResults tr:last').after(
                '<tr>'
                + '<th>Removing and re-setting row.hidden [bool].<br/> Using "" to remove, "true" to reset through properties.</th>'
                + '<td class="numeric">' + numeral(attrPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[0].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(mixdVsAttr).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(mixdPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[2].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(propVsMixd).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(propPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[1].stats.rme).format('0.00') + '%</td>'
                + '</tr>');
        })
        .run({ 'async': false });
}


testIntMaxlength = function () {
    var intSuit = new Benchmark.Suite;
    intSuit
        .add('SetInt#Attribute', function () {
            var input = document.getElementById('testInput');
            input.removeAttribute("maxlength");
            input.setAttribute("maxlength", "7");
        })
        .add('SetInt#Property', function () {
            var input = document.getElementById('testInput');
            input.maxlength = "";
            input.maxlength = "7";
        })
        .add('SetInt#Mixed', function () {
            var input = document.getElementById('testInput');
            input.removeAttribute("maxlength");
            input.maxlength = "7";
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));

            var attrPerf = 1 / this[0].stats.mean;
            var mixdPerf = 1 / this[2].stats.mean;
            var propPerf = 1 / this[1].stats.mean;

            var mixdVsAttr = (mixdPerf - attrPerf) / attrPerf;
            var propVsMixd = (propPerf - mixdPerf) / mixdPerf;

            $('#testResults tr:last').after(
                '<tr>'
                + '<th>Removing and re-setting input.maxlength [int].<br/> Using "" to remove, "7" (string) to reset through properties.</th>'
                + '<td class="numeric">' + numeral(attrPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[0].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(mixdVsAttr).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(mixdPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[2].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(propVsMixd).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(propPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[1].stats.rme).format('0.00') + '%</td>'
                + '</tr>');
        })
        .run({ 'async': false });
}


testIntColspan = function () {
    var intSuit = new Benchmark.Suite;
    intSuit
        .add('SetInt#Attribute', function () {
            var input = document.getElementById('thCols2');
            input.removeAttribute("colspan");
            input.setAttribute("colspan", 2);
        })
        .add('SetInt#Property', function () {
            var input = document.getElementById('thCols2');
            input.colspan = "";
            input.colspan = "2";
        })
        .add('SetInt#Mixed', function () {
            var input = document.getElementById('thCols2');
            input.removeAttribute("colspan");
            input.colspan = "2";
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));

            var attrPerf = 1 / this[0].stats.mean;
            var mixdPerf = 1 / this[2].stats.mean;
            var propPerf = 1 / this[1].stats.mean;

            var mixdVsAttr = (mixdPerf - attrPerf) / attrPerf;
            var propVsMixd = (propPerf - mixdPerf) / mixdPerf;

            $('#testResults tr:last').after(
                '<tr>'
                + '<th>Removing and re-setting th.colspan [int].<br/> Using "" to remove, "2" (string) to reset through properties.</th>'
                + '<td class="numeric">' + numeral(attrPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[0].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(mixdVsAttr).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(mixdPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[2].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(propVsMixd).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(propPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[1].stats.rme).format('0.00') + '%</td>'
                + '</tr>');
        })
        .run({ 'async': false });
}

testIntMaxlength2 = function () {
    var intSuit = new Benchmark.Suite;
    intSuit
        .add('SetInt#Attribute', function () {
            var input = document.getElementById('testInput');
            input.removeAttribute("maxlength");
            input.setAttribute("maxlength", 7);
        })
        .add('SetInt#Property', function () {
            var input = document.getElementById('testInput');
            input.maxlength = "";
            input.maxlength = 7;
        })
        .add('SetInt#Mixed', function () {
            var input = document.getElementById('testInput');
            input.removeAttribute("maxlength");
            input.maxlength = 7;
        })
        .on('cycle', function (event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + this.filter('fastest').map('name'));

            var attrPerf = 1 / this[0].stats.mean;
            var mixdPerf = 1 / this[2].stats.mean;
            var propPerf = 1 / this[1].stats.mean;

            var mixdVsAttr = (mixdPerf - attrPerf) / attrPerf;
            var propVsMixd = (propPerf - mixdPerf) / mixdPerf;

            $('#testResults tr:last').after(
                '<tr>'
                + '<th>Removing and re-setting input.maxlength [int].<br/> Using "" to remove, 7 (int) to reset through properties.</th>'
                + '<td class="numeric">' + numeral(attrPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[0].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(mixdVsAttr).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(mixdPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[2].stats.rme).format('0.00') + '%</td>'

                + '<td class="info vsCol">' + numeral(propVsMixd).format('+0.00%') + '</td>'

                + '<td class="numeric">' + numeral(propPerf).format('0,0') + '</td>'
                + '<td class="numeric rmeCol">±' + numeral(this[1].stats.rme).format('0.00') + '%</td>'
                + '</tr>');
        })
        .run({ 'async': false });
}