var run = function () {
    var txtOdds;
    var btnGo;
    var tblOdds;
    var txtOutput;
    var txtBase

    txtOdds = document.getElementById("txtOdds");
    btnGo = document.getElementById("btnGo");
    tblOdds = document.getElementById("tblOdds");
    txtOutput = document.getElementById("txtOutput");
    txtBase = document.getElementById("txtBase");

    txtOdds.value = "2,3,4,5,6,7,8"; onGo();

    txtBase.addEventListener("change", onGo);
    txtOdds.addEventListener("change", onGo);
    btnGo.addEventListener("click", onGo);

    function onGo() {
        var base = parseInt(txtBase.value);
        if (!base) {
            base = 2;
            txtBase.value = base;
        }

        var odds = txtOdds.value
            .replace(/\s/g, ",")
            .replace("/", ",")
            .replace(";", ",")
            .split(",")
            .filter(e => !!e)
            .map(e => parseInt(e))
            .map(e => e || -1);

        var data = [];
        var header = [];
        data.push(header);
        header.push("w\\p");        

        for (var i = 0; i < odds.length; i++) {
            var row = [];
            data.push(row);
                        
            var win_odds = odds[i];
            header.push(formatHorse(i, win_odds));
            row.push(formatHorse(i, win_odds));      
            
            for (var j = 0; j < odds.length; j++) {
                var place_odds = odds[j];

                if (i == j) {
                    row.push("");
                }
                else if (win_odds <= 0 || place_odds <= 0) {
                    row.push("-");
                }
                else {                    
                    var value = base * win_odds * (1 + place_odds);
                    //console.log(win_odds, place_odds, value);
                    row.push(value);
                }                               
            }
        }

        outputTable(tblOdds, data);
    }

    function formatHorse(i, odds) {
        if (odds <= -1)
            odds = "x";

        return "#" + (i + 1) + " (" + odds + ")";
    }

    function output(message) {
        txtOutput.innerText = txtOutput.innerText + "\n" + message;
    }

    function outputTable(table, data) {
        var thead = document.createElement("thead");
        var tbody = document.createElement("tbody");

        for (var r = 0; r < data.length; r++) {
            var rowData = data[r];
            var row = document.createElement("tr");
            var cellTag = "td";

            if (r == 0) {
                cellTag = "th";
                thead.appendChild(row);
            }
            else {
                cellTag = "td";
                tbody.appendChild(row);
            }

            for (var c = 0; c < rowData.length; c++) {
                var cellData = rowData[c];
                var cell = document.createElement(cellTag);
                row.appendChild(cell);
                cell.innerText = cellData;
            }
        }

        table.innerHTML = "";
        table.appendChild(thead);
        table.appendChild(tbody);        
    }
}

run();
