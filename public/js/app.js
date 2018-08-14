	$( document ).ready(function() {
	    MyDate.init();
        MyInfo.changeInfos();
		MyDate.addData();

		var blockResume = '<div id="bloc" class="col-12 col-md-6 text-center">' +
			'<h1>Session en cours ce mois-ci</h1>' +
            '<button class="btn" onclick="location.reload();">Afficher les sessions du jour</button>' +
			'<table class="table">' +
				'<tr class="head">' +
            		'<td>Nbre</td>' +
					'<td>Élève</td>' +
					'<td>Effectuées</td>' +
					'<td>Planifiées</td>' +
            		'<td>Annulées</td>' +
					'<td>Restantes</td>' +
				'</tr>'+
		'</div>';
		$(".table").after(blockResume);
		for(var i = 0; i < MyInfo.results.length; i++) {
			MyInfo.generateLine(i, MyInfo.results[i]);
		}
		MyInfo.total();
		MyInfo.selectStudent();
	});
	/*
	couleur pour sessions restantes en fonction du nombre
	ratio nbre de sessions faites / jours restants dans le mois
	Ajouter une fonction pour récupérer le nom du mois en Français
	*/
