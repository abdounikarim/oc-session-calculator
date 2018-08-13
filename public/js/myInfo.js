var MyInfo = {
    results: [],
    calculateTotal: function(value) {
        var result = 0;
        var selector;
        if(value === '.done') {
            selector = '.done';
        } else if(value === '.planned') {
            selector = '.planned';
        } else if(value === '.canceled'){
            selector = '.canceled';
        } else {
            selector = '.left';
        }
        $(selector).each(function (index, value) {
            var number = parseInt($(value).text());
            result += number;
        });
        return result;
    },
    changeColorField: function(value){
        var color;
        if(value === 5) {
            color = '#81F495';
        } else if(value === 4) {
            color = '#A9E4EF';
        } else if(value === 3) {
            color = '#9DAAA2';
        } else if (value === 2) {
            color = '#F77838';
        } else {
            color = '#E24141';
        }
        var field = '<td class="left" style="background-color:'+ color +'">' + value + '</td>';
        var data = [color, field];
        return data;
    },
    changeColorLine: function(cssClass, color) {
        var removeSharp = this.removeSharp(color);
        var line = '.'+ removeSharp;
        $(line).css('background-color', color);

    },
    changeInfos: function () {
        $( ".status" ).each(function( index, value) {
            var getValue = $(value);
            var newValue = $(value).text();
            console.log(MyDate.today);
            if(newValue.indexOf('TENTATIVE') === 0) {
                value = '<td class="status">Planifiée</td>';
                getValue.replaceWith(value);
            } else if(newValue.indexOf('CANCELLED') === 0) {
                value = '<td class="status">Annulée</td>';
                getValue.replaceWith(value);
            } else {
                //Comparer date du jour à celle de session
                //Si session > date du jour => planifiée
                //Sinon, effectuée
                var parent = $(this).parent();
                var children = $(parent).children();
                console.log($(children[2]).text());
                var date = $(children[2]).text();
                if(date < MyDate.today) {
                    value = '<td class="status">Effectuée</td>';
                } else {
                    value = '<td class="status">Planifiée</td>';
                }
                getValue.replaceWith(value);
            }
        });
    },
    checkCatching: function(done, total, diffDate) {
        if(MyInfo.className === 'retard') {
            for (var i = 0; i <= total; i++) {
                var check = i + done;
                var checkTotal = Math.floor(check / total * 100);
                if(checkTotal === diffDate) {
                    var catching = '<tr class="tfoot"><td class="text-left pleft" colspan="3">Session à rattraper pour être dans les temps : </td class="text-center"><td colspan="3" class="text-center retard">' +  i + '</td></tr>';
                    $("#bloc tbody").append(catching);
                    return i;
                }
            }
        } else {
            for (var i = done;  i > 0 ; i--) {
                var check = done - i;
                var checkTotal = Math.floor(check / total * 100);
                if(checkTotal === diffDate) {
                    var catching = '<tr class="tfoot"><td class="text-left pleft" colspan="3">Sessions d\'avance : </td class="text-center"><td colspan="3" class="text-center avance">' +  i + '</td></tr>';
                    $("#bloc tbody").append(catching);
                    return i;
                }
            }
        }
    },
    checkDiff: function(diffSession, diffDate){
        //Ajouter nombre de sessions d'avance ou de retard
        if(diffSession > diffDate) {
            MyInfo.result = 'AVANCE';
            MyInfo.className = 'avance';
        } else {
            MyInfo.result = 'RETARD';
            MyInfo.className = 'retard';
        }

        var session = '<tr class="tfoot"><td class="text-left pleft" colspan="3">Pourcentage de sessions effectuées : </td><td colspan="3" class="text-center">' + diffSession + '</td></tr>';
        var date = '<tr class="tfoot"><td class="text-left pleft" colspan="3">Pourcentage d\'avancée dans le mois : </td><td colspan="3" class="text-center">' + diffDate + '</td></tr>';
        var resultInfo = '<tr class="tfoot"><td class="text-left pleft" colspan="3">Résultat : </td class="text-center"><td colspan="3" class="text-center '+ MyInfo.className +'">' + MyInfo.result + '</td></tr>';

        $("#bloc tbody").append(session);
        $("#bloc tbody").append(date);
        $("#bloc tbody").append(resultInfo);
    },
    generateLine: function (increment, result) {
        var sessionLeft = 5 - (result.done + result.planned + result.canceled);
        sessionLeft = this.changeColorField(sessionLeft);
        var className = this.removeSharp(sessionLeft[0]);
        var line = '<tr class="'+ className +'">' +
            '<td class="nbre">'+ (increment+1) +'</td>' +
            '<td class="etudiant">'+result.etudiant+'</td>' +
            '<td class="done">'+result.done+'</td>' +
            '<td class="planned">'+result.planned+'</td>' +
            '<td class="canceled">'+result.canceled+'</td>' +
            sessionLeft[1] +
        '</tr>';
        $('.head').after(line);
        this.changeColorLine('line' + sessionLeft[0], sessionLeft[0]);
    },
    showMessageCanceledSession: function() {
        var info = '<tr class="tfoot"><td class="text-center retard" colspan="6">Les soutenances sont prises en compte dans le calcul. <br>Les sessions annulées ne sont pas prises en compte dans le calcul</td></tr>';
        $("#bloc tbody").append(info);
    },
    removeSharp: function (value) {
        var removeSharp = value.substring(1);
        var line = 'line'+ removeSharp;
        return line;
    },
    stats: function(value, total) {
        //Vérifier si value est un nombre ou une date
        if(typeof value === 'object') {
            value = value.getDate();
            total = MyDate.getMonth(MyDate.month);
        }
        var difference = Math.floor(value / total * 100);
        return difference;
    },
    total: function () {
        var done = this.calculateTotal('.done');
        var planned = this.calculateTotal('.planned');
        var canceled = this.calculateTotal('.canceled');
        var left = this.calculateTotal('.left');
        var total = done + planned + canceled + left;
        var blockTotal = '<tr id="total">' +
            '<td colspan="2">Total : (sur ' + total + ' sessions)</td>' +
            '<td>' + done + '</td>' +
            '<td>' + planned + '</td>' +
            '<td>' + canceled + '</td>' +
            '<td>'+ left +'</td>' +
            '</tr>';
        $("#bloc tbody").append(blockTotal);
        var diffSession = this.stats(done, total);
        var diffDate = this.stats(MyDate.date, MyDate.month);
        this.checkDiff(diffSession, diffDate);
        this.checkCatching(done, total, diffDate);
        this.showMessageCanceledSession();
    }
};