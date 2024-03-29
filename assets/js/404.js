/*
 * （JS部分のみ抜粋）
 * パーマリンクをクエリストリング付きのURLに変換してリダイレクト
 */

// リダイレクト先のファイル名
var redirect_file_name = 'doc-0.html';
var redirect_file_name = 'doc-1.html';
var redirect_file_name = 'doc-2.html';

// リダイレクトで使用するパラメータキー
var parameter_key = 'post_id';

// パーマリンクの取得
var path_name = window.location.pathname;

// クエリストリング付きのURLに変換してリダイレクト
var match_condition = new RegExp(redirect_file_name.replace('.html', '') + '/[a-z0-9-_]+$');
if (permalink = path_name.match(match_condition))
{
  location.href = path_name.replace(permalink, '') + redirect_file_name + '?' + parameter_key + '=' + permalink[0].replace(/Documantation\//, '');
}