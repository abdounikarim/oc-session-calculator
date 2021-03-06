<!DOCTYPE html>
<html>
<head>
	<title>OC calculator session tool</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
	<link type="text/css" rel="stylesheet" href="css/style.css">
</head>
<body>
<?php

require '../config.php';
require '../src/ics.php';

/* Replace the URL / file path with the .ics url */
$file = CALENDAR_URL;
/* Getting events from isc file */
$obj = new ics();
$icsEvents = $obj->getIcsEventsAsArray( $file );
unset( $icsEvents [1] );
$html = '<div class="container-fluid"><div class="row"><table class="table table-dark table-striped col-12 col-md-6 text-center"><tr><th>Nbre</th><th> Élève </th><th> Date de début de session </th><th> Statut </tr>';
$i = 1;

$today = new DateTime();
$month = $today->format('m');

foreach( $icsEvents as $icsEvent){
        /* Getting start date and time */
        $start = isset( $icsEvent ['DTSTART;VALUE=DATE'] ) ? $icsEvent ['DTSTART;VALUE=DATE'] : $icsEvent ['DTSTART'];
        /* Converting to datetime and apply the timezone to get proper date time */
        $startDt = new DateTime ( $start );
        $startDt->setTimeZone ( new DateTimezone ('Europe/Paris') );
        $startDate = $startDt->format ( 'd/m/Y H:i' );
        $startMonth = $startDt->format ( 'm' );
        //If session is not in current month, we don't show her
        if($month === $startMonth) {
            /* Getting end date with time */
            $end = isset( $icsEvent ['DTEND;VALUE=DATE'] ) ? $icsEvent ['DTEND;VALUE=DATE'] : $icsEvent ['DTEND'];
            $endDt = new DateTime ( $end );
            $endDate = $endDt->format ( 'd/m/Y h:i' );
            /* Getting the name of event */
            $eventName = $icsEvent['SUMMARY'];

            $status = $icsEvent ['STATUS'];
            $html .= '<tr class="line"><td class="quantity">'.$i.'</td><td class="student">'.$eventName.'</td><td class="start">'.$startDate.'</td><td class="status">'.$status.'</td></tr>';
            $i++;
        }
}
echo $html.'</table></div></div>';

?>
<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
<script src="js/myDate.js"></script>
<script src="js/myInfo.js"></script>
<script src="js/app.js"></script>
</body>
</html>