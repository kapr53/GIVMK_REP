$(function (){
   // Programamos el listado de clientes por ajax
    var tblProductos = $('#listadoProd').DataTable({
        responsive: true,
        scrollX: true,
        autoWidth: false,
        destroy: true,
        deferRender: true,
        language: {
            "lengthMenu": "Mostrar _MENU_ registros por página",
            "zeroRecords": "No se encontraron Registros - Lo sentimos..!",
            "info": "Mostrando página _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros Disponibles",
            "search": "Buscar:",
            "infoFiltered": "(filtered from _MAX_ total records)",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "thousands": ",",
            "decimal": "",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
            }
        },
        ajax: {
            url: window.location.pathname,
            type: 'POST',
            data: {
                'action': 'searchdata'
            },
            dataSrc: ""
        },
        columns: [
            {'data': 'img'},
            {'data': 'nombre'},
            {'data': 'precio_consultora'},
            {'data': 'precio_catalogo'},
            {'data': 'existencia'},
            {'data': 'id'},
        ],
        columnDefs: [
            {
                targets: [5],
                class: 'text-center',
                orderable: false,
                render: function (data, type, row) {
                    var btn = '<button rel="edit" class="btn btn-warning btn-circle mr-2" title="Editar Cliente">';
                    btn += '<i class="fas fa-user-edit"></i></button>';
                    btn += '<button rel="delete" class="btn btn-danger btn-circle mr-2" title="Eliminar Cliente">';
                    btn += '<i class="fas fa-trash"></i></button>';
                    btn += '<button rel="view" class="btn btn-info btn-circle mr-1" title="Eliminar Cliente">';
                    btn += '<i class="fas fa-eye"></i></button>';
                    return btn;
                }
            },
            {
                targets: [0],
                class: 'text-center',
                render: function (data, type, row) {
                    var img = '<img src="' + data + '" class="rounded-circle" width="45" height="45">'
                    return img;
                }
            }
        ],
        initComplete: function (settings, json) {
            console.log('%cSe ha cargado correctamente la tabla', 'color: blue;');
        }
    });

    // Obtenemos el evento del boton vista
    $('#listadoProd tbody')
        .on('click', 'button[rel="view"]', function () {

            // tomamos la linea de la tabla
            var tr = tblProductos.cell($(this).closest('td, li')).index();
            // tomamos el dato
            var data = tblProductos.row(tr.row).data();
            // mandamos a pedir la url dinamica
            var url = obtenerUrl(data.id, 'ver');

            abrir_modal(url);
        });

    // Obtenemos el evento del boton eliminar
    $('#listadoProd tbody')
        .on('click', 'button[rel="delete"]', function () {

            // tomamos la linea de la tabla
            var tr = tblProductos.cell($(this).closest('td, li')).index();
            // tomamos el dato
            var data = tblProductos.row(tr.row).data();
            // mandamos a pedir la url dinamica
            var url = obtenerUrl(data.id, 'eliminar');

            var parameters = new FormData();
            parameters.append('id', data.id);
            var content = 'Se eliminara el siguiente producto: '+ data.nombre;
            console.log(url);
            eliminarAjaxList(url, parameters, function (){
                tblProductos.ajax.reload(); }, content, 'Eliminar')
        });

    // Obtenemos el evento del boton editar
    $('#listadoProd tbody')
        .on('click', 'button[rel="edit"]', function () {

            // tomamos la linea de la tabla
            var tr = tblProductos.cell($(this).closest('td, li')).index();
            // tomamos el dato
            var data = tblProductos.row(tr.row).data();
            // mandamos a pedir la url dinamica
            var url = obtenerUrl(data.id, 'editar');

            location.href=url;
        });
    var filterTable = $('.dataTables_filter');
    filterTable.addClass("d-flex justify-content-end mr-2");
    var paginateTable = $('.dataTables_paginate')
    paginateTable.addClass("d-flex justify-content-end mr-2");
});