; "Open in Oz" shell verbs for folders, folder backgrounds, and drives.
; HKCU matches installer currentUser scope. %V = clicked path.
; NoWorkingDirectory keeps Explorer from overriding %V (System32 on Drive).

!macro NSIS_HOOK_POSTINSTALL
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInOz" "" "Open in Oz"
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInOz" "Icon" '"$INSTDIR\oz.exe",0'
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInOz" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Directory\shell\OpenInOz\command" "" '"$INSTDIR\oz.exe" "%V"'

  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInOz" "" "Open in Oz"
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInOz" "Icon" '"$INSTDIR\oz.exe",0'
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInOz" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Directory\Background\shell\OpenInOz\command" "" '"$INSTDIR\oz.exe" "%V"'

  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInOz" "" "Open in Oz"
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInOz" "Icon" '"$INSTDIR\oz.exe",0'
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInOz" "NoWorkingDirectory" ""
  WriteRegStr HKCU "Software\Classes\Drive\shell\OpenInOz\command" "" '"$INSTDIR\oz.exe" "%V"'
!macroend

!macro NSIS_HOOK_POSTUNINSTALL
  DeleteRegKey HKCU "Software\Classes\Directory\shell\OpenInOz"
  DeleteRegKey HKCU "Software\Classes\Directory\Background\shell\OpenInOz"
  DeleteRegKey HKCU "Software\Classes\Drive\shell\OpenInOz"
!macroend
