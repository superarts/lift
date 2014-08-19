# How to use:
1. Create new project
	* cocos new demo-boracay -p app.free.store.lift.boracay -l js -d .
2. Add Lift into the new project
	* git init
	* git remote add origin git@bitbucket.org:superarts/lift-demo-beta.git
	* git fetch
	* git checkout -t origin/master --force
4. Build
	* iOS
		* open frameworks/runtime-src/proj.ios_mac/demo-boracay.xcodeproj/
		* Change target to 'demo-boracay iOS'
		* TODO: change orientation to portrait manually
		* Command+R
	* Android
		* cocos run -p android
		* TODO: change orientation to portrait manually
		* adb install runtime/android/demo-boracay-debug.apk

# Resource
* URL: https://bitbucket.org/superarts/lift-demo-beta
* FAQ: https://github.com/superarts/lift/wiki/FAQ
* Project: https://www.smartapp.com/gantterforgoogledrive/
