<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo list</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" rel="stylesheet">
    <script crossorigin="anonymous" defer integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" integrity="sha512-HK5fgLBL+xu6dm/Ii3z4xhlSUyZgTT9tuc/hSrtw6uzJOvgRr2a9jyxxT1ely+B+xFAmJKVSTbpM/CuL7qxO8w==" crossorigin="anonymous" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap" rel="stylesheet">
    <link href="{{asset('css/style.css')}}" rel="stylesheet">
    <script type="application/javascript" src="{{asset('js/app.js')}}" defer></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div class="container text-center d-flex flex-column rounded">
        <h1 class="text-light">Todo list</h1>
            <div class="d-flex flex-row justify-content-center mb-auto small-box-shadow">
            <input id="new-item-input" class="input-width" type="text" value=""/>
            <button class="btn btn-success success-button-width" id="add-item">Add <i class="fas fa-plus-square"></i></button>
        </div>
        <div class="mt-3 d-flex flex-column bd-highlight mb-3 text-light" id="todo-list"></div>
    </div>

    <h3 id="error-box"></h3>
</body>
</html>
