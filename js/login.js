$(document).ready(() => {
    let visible = false
    const visibleIcon = '<i class="bi bi-eye"></i>'
    const noVisibleIcon = '<i class="bi bi-eye-slash"></i>'
    $('span.botonVer').click(function () {
        visible = !visible
        if(visible)
        {
            $(this).empty().append(noVisibleIcon)
            $('.loginPassword input').attr('type', 'text')
        }
        else
        {
            $(this).empty().append(visibleIcon)
            $('.loginPassword input').attr('type', 'password')
        }
    })
})