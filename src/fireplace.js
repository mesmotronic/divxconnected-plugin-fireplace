/**
 * Fireplace Plug-in for DivX Connected
 */

var dctk;

function onKeyEvent(event)
{
	switch(event.buttonId)
	{
		case dcKeyEvent.BUTTON_ID_BACK:
			window.history.back();
			break;
	}
}

function onLoadComplete()
{
	var storage = connected.openStorage("Fireplace", true);
	var quit = storage.get("quit");

	storage["delete"]("quit");
	
	if (quit == "true")
	{
		window.history.back();
		return;
	}
	
	storage.set("quit", "true");
	
	//
	
	dctk = connected.toolkit;
	dctk.logicalWidth = 1280;
	dctk.logicalHeight = 720;
	
	var rootPanel = dctk.createPanelCtrl("root", true);
	rootPanel.width = 1280;
	rootPanel.height = 720;
	rootPanel.onUnhandledKeyEvent = onKeyEvent;
	
	dctk.rootPanel = rootPanel;
	
	var desc = connected.createPageDescriptor();
	desc.audioCapture = true;
	desc.uri = "fireplace.html";
	desc.pageType = dcIConnected.PT_HTML;
	desc.htmlInputFocusMode = dcIPageDescriptor.FOCUS_MODE_OBJECT
	
	connected.loadFromPageDescriptor(desc);
}
