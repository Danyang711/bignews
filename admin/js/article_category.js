$(function() {
  //  获取文章类别数据
  function getCategoryData() {
    $.ajax({
      url: BigNew.category_list,
      type: 'get',
      success: function(backData) {
        // console.log(backData);
        // 调用模板引擎传入数据
        var html = template("cateTem", backData);
        // //   渲染页面
        $('tbody').html(html);
      }
    });

  }
  getCategoryData();

  //  点击新增分类
  $('.btn-primary').click(function() {
    //   获取数据
    var name = $('.cate-name').val();
    var slug = $('.cate-slug').val();

    $.ajax({
      url: BigNew.category_add,
      type: 'post',
      data: {
        name: name,
        slug: slug
      },
      success: function(backData) {
        // console.log(backData);
        if (backData.code === 201) {
          // 成功
          $('#myModal').modal('hide');
          getCategoryData();
        }

      }
    });

  });

  //点击删除分类
  // tr是动态创建的 需要用到事件委托
  $('tbody').on('click', '.btn-delete', function() {
    var id = $(this).attr('data-id');

    $.ajax({
      url: BigNew.category_delete,
      type: 'post',
      data: {
        id: id
      },
      success: function(backData) {
        if (backData.code === 204) {
          // 重新获取数据
          getCategoryData();
        }
      }
    });

  });


  //点击编辑分类
  $('tbody').on('click', '.btn-info', function() {
    var id = $(this).next().attr('data-id');

    $.ajax({
      url: BigNew.category_search,
      data: {
        id: id
      },
      success: function(backData) {
        console.log(backData);
        //设置数据
        $('.edit-name').val(backData.data[0].name);
        $('.edit-slug').val(backData.data[0].slug);
        // 额外保存的id
        $('.edit-id').val(backData.data[0].id);
        // 弹出框框
        $('#editModal').modal('show');

      }
    });

  });


  // 点击修改
  $('#editModal .btn-success').click(function() {
    // 获取数据
    var id = $('.edit-id').val();
    var name = $('.edit-name').val();
    var slug = $('.edit-slug').val();

    $.ajax({
      url: BigNew.category_edit,
      type: 'post',
      data: {
        id: id,
        name: name,
        slug: slug
      },
      success: function(backData) {
        // console.log(backData);
        if (backData.code === 200) {
          //关闭弹窗
          $('#editModal').modal('hide');
          getCategoryData();
        }

      }
    });

  });
});