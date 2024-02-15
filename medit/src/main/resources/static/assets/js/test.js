$(".test").on("click", showDate);

function showDate() {
    let ptnt_id = $(this).find(".jsId").html();
    console.log(ptnt_id);
}

