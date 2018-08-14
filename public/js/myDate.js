var MyDate = {
    data: [],
    addData: function() {
        $('.line').each(function(index, value){

            var childs = $(this).children();

            var etudiant = $(childs[1]).text();
            var date = $(childs[2]).text();
            var status = $(childs[3]).text();

            if(status === 'Planifiée') {
                var done = 0;
                var planned = 1;
                var canceled = 0;
            } else if(status === 'Effectuée') {
                var done = 1;
                var planned = 0;
                var canceled = 0;
            } else {
                var done = 0;
                var planned = 0;
                var canceled = 1;
            }

            var result = {
                'etudiant': etudiant,
                'date': date,
                'done': done,
                'planned': planned,
                'canceled': canceled
            };

            MyDate.data.push(result);
        });

        function tri(a,b)
        {
            return (a.etudiant > b.etudiant)?1:-1;
        }

        MyDate.data.sort(tri);

        for(var i = 0; i < MyDate.data.length; i++) {
            var j = i + 1;
            if(MyDate.data[j] != undefined) {
                if(MyDate.data[i].etudiant === MyDate.data[j].etudiant) {
                    if(MyDate.data[i].done > 0) {
                        MyDate.data[j].done = MyDate.data[j].done + MyDate.data[i].done;
                    }
                    if(MyDate.data[i].planned > 0 ) {
                        MyDate.data[j].planned = MyDate.data[j].planned + MyDate.data[i].planned;
                    }
                    if(MyDate.data[i].canceled > 0 ) {
                        MyDate.data[j].canceled = MyDate.data[j].canceled + MyDate.data[i].canceled;
                    }
                    //On supprime le champ précédent et on le remplace par le champ suivant avec les données combinées
                    MyInfo.results.splice(MyDate.data[i], 1, MyDate.data[j]);
                } else {
                    MyInfo.results.push(MyDate.data[i]);
                }
            }
        }
        MyInfo.results.sort(tri);
        MyInfo.results.reverse();
    },
    addResult: function() {

    },
    getMonth: function(month){
        var value;
        if(month == '02') {
            //pas géré pour les 29 jours tous les 4 ans
            value = 28;
        } else if(month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12' ) {
            value = 31;
        } else {
            value = 30;
        }
        return value;
    },
    init: function () {
        MyDate.date = new Date();
        MyDate.day = MyDate.date.getDate();
        MyDate.month = MyDate.date.getMonth();
        MyDate.hours = MyDate.date.getHours();
        MyDate.minutes = MyDate.date.getMinutes();

        if(MyDate.day < 10) {
            MyDate.day = '0'+MyDate.day.toString();
        }
        MyDate.month++;
        if(MyDate.month < 10) {
            MyDate.month = '0'+MyDate.month.toString();
        }
        if(MyDate.hours < 10) {
            MyDate.hours = '0'+MyDate.hours.toString();
        }
        if(MyDate.minutes < 10) {
            MyDate.minutes = '0'+MyDate.minutes.toString();
        }

        //Date du jour
        MyDate.today = MyDate.day+'/'+MyDate.month+'/'+MyDate.date.getFullYear().toString()+' '+MyDate.hours+':'+MyDate.minutes;
    }
};