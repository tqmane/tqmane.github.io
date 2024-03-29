/*
 * （JS部分のみ抜粋）
 * クエリストリング付きのURLをパーマリンクに再変換
 */

// ファイル名
var file_name = 'doc-0.html';
var file_name = 'doc-1.html';
var file_name = 'doc-2.html';

// パラメータキー
var parameter_key = 'post_id';

// URLを取得
var path_name = window.location.pathname;
var query_string = window.location.search;
var base_dir = path_name.split(file_name)[0];

// パーマリンクに再変換
var match_condition = new RegExp(parameter_key + '=[a-z0-9-_]+$');
if (parameter = query_string.match(match_condition))
{
  parameter_value = parameter[0].split('=')[1];
  history.replaceState(null, null, base_dir + file_name.replace('.html', '/') + parameter_value);
  document.title = parameter_value + ' | Github Pages Rewrite';
}