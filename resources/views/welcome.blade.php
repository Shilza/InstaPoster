<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="{{asset('css/all.css')}}" rel="stylesheet"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>InstaPoster</title>

    <style>
        #root {
            width: 100%;
            height: 100%;
        }
    </style>

</head>
<body>
<div id="root"></div>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
