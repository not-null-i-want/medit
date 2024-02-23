let isFirst;
let isLast;
let pageNumber;
let totalPage;
let startPage;
let endPage;

// let table = document.getElementById("ptntTable");
let table = $("#ptntTable");
let pageNumberSpace = $("#pageNumber");

let nextBtn = document.getElementById("next");
let preBtn = document.getElementById("pre");
let firtsBtn = document.getElementById("first");
let lastBtn = document.getElementById("last");

//////////////////// 첫 진입시 페이지 로딩 ///////////////
$(document).ready(function() {
   
   $.ajax({
      url: "/paging",
      contentType: "application/json;charset=UTF-8",
      // dataType: "json",
      success: function(res){
         
         console.log(res);
         
         isFirst = res.first;
         isLast = res.last;
         pageNumber = res.number;
         totalPage = res.totalPage;
         
         startPage = res.startPage;
         endPage = res.endPage;
         
         let patients = res.patients;
         
         table.append(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
         `).trigger("create");
         
         patients.forEach(function(ptnt){
            
            table.append(`
               <tr class="selectPtnt">
                        <td>${ptnt.ptntId}</td>
                        <td>${ptnt.ptntName}</td>
                        <td>${ptnt.doctorId.doctorName}</td>
                    </tr>
            `).trigger("create");
         });
         
            for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
            }
      },
      error: function(){
         console.log("error")
      }
   });

});
///////////////////////////////////////////////////////////

//////////////////// 다음 페이지 로딩 /////////////////////
let next = () => {
   
   if(!isLast){
      $.ajax({
      url : "/paging",
      data : {"page" : pageNumber + 2},
      success : function(res){
         console.log(res);
         
         isFirst = res.first;
         isLast = res.last;
         pageNumber = res.number;
         
         startPage = res.startPage;
         endPage = res.endPage;
      
         let patients = res.patients;
         
         pageNumberSpace.html("").trigger("create");
         
         table.html(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
         `).trigger("create");
         
         patients.forEach(function(ptnt){
            
            table.append(`
               <tr class="selectPtnt">
                        <td>${ptnt.ptntId}</td>
                        <td>${ptnt.ptntName}</td>
                        <td>${ptnt.doctorId.doctorName}</td>
                    </tr>
            `).trigger("create");
         });
         
         for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
         }
         
      },
      error : function(){
         console.log("paging error");
      }})
   }
}
nextBtn.addEventListener("click", next);
///////////////////////////////////////////////////////////

//////////////////// 이전 페이지 로딩 /////////////////////
let pre = () => {
   
   if(!isFirst){
      $.ajax({
      url : "/paging",
      data : {"page" : pageNumber},
      success : function(res){
         console.log(res);
         
         isFirst = res.first;
         isLast = res.last;
         pageNumber = res.number;
         
         startPage = res.startPage;
         endPage = res.endPage;
      
         let patients = res.patients;
         
         pageNumberSpace.html("").trigger("create");
         
         table.html(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
         `).trigger("create");
         
         patients.forEach(function(ptnt){
               
            table.append(`
               <tr class="selectPtnt">
                      <td>${ptnt.ptntId}</td>
                       <td>${ptnt.ptntName}</td>
                       <td>${ptnt.doctorId.doctorName}</td>
                   </tr>
               `).trigger("create");
         });   
         
         for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
         }
         
      },
      error : function(){
         console.log("paging error");
      }})
   }
}
   
preBtn.addEventListener("click", pre);
///////////////////////////////////////////////////////////

//////////////////// 맨 앞 페이지 로딩 /////////////////////
let first = () => {
   
   if(!isFirst){
      
      $.ajax({
      url : "/paging",
      data : {"page" : 1},
      success : function(res){
         console.log(res);
         
         isFirst = res.first;
         isLast = res.last;
         pageNumber = res.number;
         
         startPage = res.startPage;
         endPage = res.endPage;
      
         let patients = res.patients;
         
         pageNumberSpace.html("").trigger("create");
         
         table.html(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
         `).trigger("create");
            
         patients.forEach(function(ptnt){
               
            table.append(`
               <tr class="selectPtnt">
                       <td>${ptnt.ptntId}</td>
                       <td>${ptnt.ptntName}</td>
                       <td>${ptnt.doctorId.doctorName}</td>
                   </tr>
            `).trigger("create");
         });
         
         for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
         }
         
      },
      error : function(){
         console.log("paging error");
      }})
   }
}
   
firtsBtn.addEventListener("click", first);
///////////////////////////////////////////////////////////

//////////////////// 맨 끝 페이지 로딩 /////////////////////
let last = () => {
   
   if(!isLast){
      
      $.ajax({
      url : "/paging",
      data : {"page" : totalPage},
      success : function(res){
         console.log(res);
         
         isFirst = res.first;
         isLast = res.last;
         pageNumber = totalPage-1;
         
         startPage = res.startPage;
         endPage = res.endPage;
      
         let patients = res.patients;
         
         pageNumberSpace.html("").trigger("create");
         
         table.html(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
         `).trigger("create");
            
         patients.forEach(function(ptnt){
               
            table.append(`
               <tr class="selectPtnt">
                       <td>${ptnt.ptntId}</td>
                       <td>${ptnt.ptntName}</td>
                       <td>${ptnt.doctorId.doctorName}</td>
                   </tr>
            `).trigger("create");
         });   
         
         for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
         }
            
      },
      error : function(){
         console.log("paging error");
      }})
   }
}
lastBtn.addEventListener("click", last);
///////////////////////////////////////////////////////////

// $(document).on('click', '.test', function() {
//     let ptntId = $(this).find('td:eq(0)').text(); // tr의 첫 td에 접근
//     console.log(ptntId);
// });
///////////////////////////////////////////////////////////

//////////////////// 클릭 페이지 로딩 /////////////////////
$(document).on('click', '.pageNumber', function() {
    let selectPageNum = $(this).text(); // 
    console.log(selectPageNum);

   $.ajax({
         url : "/paging",
         data : {"page" : selectPageNum},
         success : function(res){
            console.log(res);
            
            isFirst = res.first;
            isLast = res.last;
            pageNumber = res.number;
            
            startPage = res.startPage;
            endPage = res.endPage;
         
            let patients = res.patients;
            
            pageNumberSpace.html("").trigger("create");
            
            table.html(`
            <tr>
               <td>No.</td>
               <td>환자명</td>
               <td>담당의</td>
            </tr>
            `).trigger("create");
               
            patients.forEach(function(ptnt){
                  
               table.append(`
                  <tr class="selectPtnt">
                          <td>${ptnt.ptntId}</td>
                          <td>${ptnt.ptntName}</td>
                          <td>${ptnt.doctorId.doctorName}</td>
                      </tr>
               `).trigger("create");
            });   
            
            for(let i = startPage; i <= endPage; i++){
               if(i == pageNumber + 1){
                  pageNumberSpace.append(`
                     <b><span class="num">${i}</span></b>
                  `).trigger("create");
               } else {
               pageNumberSpace.append(`
                  <span class="pageNumber num">${i}</span>
                  `).trigger("create");
               }
            }
               
         },
         error : function(){
            console.log("paging error");
         }})
});
///////////////////////////////////////////////////////////