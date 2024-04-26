var hx = require("hbuilderx");
const {
	randomEnText, 
	randomCnText, 
	randomParagraph, 
	randomCnParagraph,
	randomEnWord,
	randomTime,
	randomUuid,
  randomPhone,
  randomAddress,
  randomEmail,
  randomUrl,
  randomUsername
} = require('./utils/randomtext.js');
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @description 获取当前行选区
 */
async function getCurrentLineFromPosition() {
    let position = await hx.window.getActiveTextEditor().then(function(editor) {
        let selection = editor.selection.active;
        if (selection == 0) return 0;
        return editor.document.lineFromPosition(selection).then((line) => {
            let { start } = line;
            return start;
        });
    });
    return position;
};

/**
 * 插入文本
 * @param {String} text 
 * @returns 
 */
const insertTextAction = async (text) => {
		// 获取行首行尾
		// let lineStartPosition = await getCurrentLineFromPosition();
		// if (lineStartPosition == undefined) {
		// 	hx.window.showErrorMessage("提示：获取当前行位置信息错误，插入占位内容失败。请重试", ["我知道了"]);
		// 	return;
		// };
		// startPosition = lineStartPosition;
		let editor = await hx.window.getActiveTextEditor();
		let selection = editor.selection;
		// console.log('---- selection ----:', selection)
		let workspaceEdit = new hx.WorkspaceEdit();
		let edits = [];
		edits.push(new hx.TextEdit({
			start: selection.start,
			end: selection.end
		}, text));

		workspaceEdit.set(editor.document.uri, edits);
		hx.workspace.applyEdit(workspaceEdit);
}

/**
 * 插入代码片段
 * @param {String} snippetString
 * @returns 
 */
const insertSnippetAction = (snippetString) => {
	let editor = hx.window.getActiveTextEditor();
	if (!editor) {
		return;
	}
	let selection = editor.selection;
	editor.edit(editBuilder => {
		// @ts-ignore
		editBuilder.insertSnippet(new hx.SnippetString(snippetString), selection.start);
	});
}

/**
 * @param {hx.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "placeholder" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let selectPick = '';

	let disposable = hx.commands.registerCommand('placeholder.placeholder', function () {
		// The code you place here will be executed every time your command is executed
		// let editor = hx.window.activeTextEditor;
		// editor.insertSnippet(new hx.SnippetString('我们是朋友123456世上只有妈妈好！'))
		// console.log('---- placeholder.helloWorld ----:', editor.edit);
		hx.window.showQuickPick([{
				label: '中文',
				description: '随机中文',
				detail: '插入指定个数的中文汉字'
			},{
				label: '中文段落',
				description: '随机中文段落',
				detail: '插入指定个数的中文段落'
			}, {
				label: '图片',
				description: '随机图片',
				detail: '插入随机占位图片'
			}, {
				label: '英文',
				description: '随机英文',
				detail: '插入指定个数的英文单词'
			}, {
				label: '英文字母',
				description: '随机英文字母',
				detail: '插入指定个数的英文字母'
			}, {
				label: '英文段落',
				description: '随机英文段落',
				detail: '插入指定个数的英文段落'
		}, {
			label: '其它',
			description: '其它特定格式占位符',
			detail: 'uuid,时间、手机号、邮箱、地址、用户名、url等占位符'
		}]).then(value => {
				if (!value) {
					return;
				}
				hx.window.setStatusBarMessage('你选择插入占位：' + value.label, 3000);
				selectPick = value.label;
				if (selectPick === '图片') {
						const settings = hx.workspace.getConfiguration('placeholder');
						const snippetImgs = {
							Picsum: {
								text: 'https://picsum.photos/300/300.jpg?random='+Date.now(),
								img: `<img src="https://picsum.photos/300/300.jpg?random=${Date.now()}" alt="">`,
								image: `<image src="https://picsum.photos/300/300.jpg?random=${Date.now()}" mode="scaleToFill">`
							},
							FPOImg: {
								text: 'https://fpoimg.com/300x300?text=example&bg_color=999999&text_color=ff4400',
								img: '<img src="https://fpoimg.com/300x300?text=example&bg_color=999999&text_color=ff4400" alt="">',
								image: '<img src="https://fpoimg.com/300x300?text=example&bg_color=999999&text_color=ff4400" mode="scaleToFill">'
							},
							DummyImage: {
								text: 'https://dummyimage.com/300x300/999999/ff4400.png&text=EXAMPLE',
								img: '<img src="https://dummyimage.com/300x300/999999/ff4400.png&text=EXAMPLE" alt="">',
								image: '<image src="https://dummyimage.com/300x300/999999/ff4400.png&text=EXAMPLE" mode="scaleToFill">'
							},
							ViaPlaceholder: {
								text: 'https://via.placeholder.com/640x300/999999/ff4400.png?text=example',
								img: '<img src="https://via.placeholder.com/640x300/999999/ff4400.png?text=example" alt="">',
								image: '<image src="https://via.placeholder.com/640x300/999999/ff4400.png?text=example" mode="scaleToFill">'
							},
							PlaceholdJp: {
								text: 'https://placehold.jp/999999/ff4400/300x300.png?text=EXAMPLE',
								img: '<img src="https://placehold.jp/999999/ff4400/300x300.png?text=EXAMPLE" alt="">',
								image: '<image src="https://placehold.jp/999999/ff4400/300x300.png?text=EXAMPLE" mode="scaleToFill">'
							},
							DevtoolTech: {
								text: 'https://devtool.tech/api/placeholder/300/300?text=示例图片&color=#ffffff&bgColor=#333333',
								img: '<img src="https://devtool.tech/api/placeholder/300/300?text=示例图片&color=#ffffff&bgColor=#333333" alt="">',
								image: '<image src="https://devtool.tech/api/placeholder/300/300?text=示例图片&color=#ffffff&bgColor=#333333" mode="scaleToFill">'
							},
						}
						hx.window.showQuickPick([{
								label: 'Picsum',
								description: 'Picsum占位图片',
								detail: '图片有实际内容，格式jpg/webp'
							},{
								label: 'DummyImage',
								description: 'DummyImage占位图',
								detail: '纯色图片，格式png/jpg/gif,支持显示文字（不支持中文）'
							},{
								label: 'PlaceholdJp',
								description: 'placehold.jp占位图片',
								detail: '纯色图片，格式png/jpg/gif/webp,支持显示文字（支持中文）'
							},{
								label: 'DevtoolTech',
								description: 'DevtoolTech占位图',
								detail: '纯色图片，不支持定义格式,支持显示文字（支持中文）'
							},{
								label: 'ViaPlaceholder',
								description: 'ViaPlaceholder点位图',
								detail: '纯色图片，格式png/jpg/gif/webp,支持显示文字（不支持中文）'
							},{
								label: 'FPOImg',
								description: 'FPOImg占位图片',
								detail: '纯色图片，不支持定义格式,支持显示文字（不支持中文）'
							}]).then((imgValue) => {
								if (!imgValue) {
									return;
								}
								const imgObj = snippetImgs[imgValue.label];
								hx.window.showQuickPick([{
										label: 'url',
										description: '插入url',
										detail: '插入一个图片url地址'
									},{
										label: 'image',
										description: '插入image',
										detail: '插入一个带url的图片image标签'
									},{
										label: 'img',
										description: '插入img',
										detail: '插入一个带url的图片img标签'
									}]).then((otherValue) => {
										if (!otherValue) {
											return;
										}
										hx.window.setStatusBarMessage('你选择插入占位：' + otherValue.label, 3000);
										let selectPick = otherValue.label;
										// 生成占位文本
										let insertText = imgObj[selectPick];
										insertTextAction(insertText);
									})
								
								// hx.window.setStatusBarMessage('你选择插入占位：' + imgValue.description, 3000);
								// const imgType = settings.get('img');
								// let snippetString = snippetImgs[imgValue.label][imgType === 'url' ? 'text' : 'img'];
								// // insertSnippetAction(snippetString);
								// insertTextAction(snippetString);
							})
						return;
				}
				if (selectPick === '其它') {
					hx.window.showQuickPick([{
							label: 'uuid',
							description: '随机uuid',
							detail: '插入一个随机uuid'
						}, {
							label: '日期',
							description: '随机日期',
							detail: '插入一个随机日期'
						},{
							label: '电话',
							description: '随机电话号码',
							detail: '插入随机电话号码'
						}, {
							label: '邮箱',
							description: '随机邮箱',
							detail: '插入随机邮箱'
						}, {
							label: '地址',
							description: '随机地址',
							detail: '插入一个随机地址'
						}, {
							label: '姓名',
							description: '随机姓名',
							detail: '插入随机姓名'
						}, {
							label: '网址',
							description: '随机网址',
							detail: '插入一个随机url网址'
					}]).then((otherValue) => {
						if (!otherValue) {
							return;
						}
						hx.window.setStatusBarMessage('你选择插入占位：' + otherValue.label, 3000);
						let selectPick = otherValue.label;
						// 生成占位文本
						let insertText = '';
						switch(selectPick) {
							case 'uuid':
								insertText = randomUuid();
								break;
							case '日期':
								insertText = randomTime();
								break;
							case '电话':
								insertText = randomPhone();
								break;
							case '邮箱':
								insertText = randomEmail();
								break;
							case '地址':
								insertText = randomAddress();
								break;
							case '姓名':
								insertText = randomUsername();
								break;
							case '网址':
								insertText = randomUrl();
								break;
							default:
								break;
						}
						console.log("随机文本: 1", insertText);
						insertTextAction(insertText);
					})
					return;
				}
				// 输入框提示
				let tipsText = '';
				switch(selectPick) {
					case '中文':
						tipsText = '输入想生成的中文汉字个数';
						break;
					case '英文':
						tipsText = '输入想生成的英文单词个数';
						break;
					case '英文字母':
						tipsText = '输入想生成的英文字母个数';
						break;
					case '中文段落':
						tipsText = '输入想生成的中文段落数（一个。表示一段）';
						break;
					case '英文段落':
						tipsText = '输入想生成的英文段落数（一个.表示一段）';
						break;
					default:
						break;
				}
				// 占位文字
				hx.window.showInputBox({ // 这个对象中所有参数都是可选参数
						password:false, // 输入内容是否是密码
						ignoreFocusOut:true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
						placeHolder: tipsText, // 在输入框内的提示信息
						prompt:'请输入数字', // 在输入框下方的提示信息
						validateInput:function(text){return Number(text) > 0 ? null : '请输入大于1的数字';} // 对输入内容进行验证并返回
					}).then(function(count){
						// 生成占位文本
						let insertText = '';
						switch(selectPick) {
							case '中文':
								insertText = randomCnText(count);
								break;
							case '英文':
								insertText = randomEnText(count);
								break;
							case '英文字母':
								insertText = randomEnWord(count);
								break;
							case '中文段落':
								insertText = randomCnParagraph(count);
								break;
							case '英文段落':
								insertText = randomParagraph(count);
								break;
							default:
								break;
						}
						console.log("随机文本：0", count, insertText);
						insertTextAction(insertText);
				});
			})
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
