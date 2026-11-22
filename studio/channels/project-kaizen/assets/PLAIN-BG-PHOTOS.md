# Plain-background photos (added 22 Nov, sent by owner)
Use for clean cut-outs. Raw files are kept out of the repo (text-only); working copies live in the session scratchpad `kz/new/nNN.jpg`.
- Discipline model (head-down front pose): n01 sage wall (best contrast for cut-out, used for v4), n07/n08 green gradients, n09/n11 navy, n10 maroon. All 1568x2354 except n07/n08 (1365x2048).
- Arise model (blue tank, cap, face hidden): n02-n06, n12, n15 are 1152x2048 and SOFT (sharp score 6-12) - check quality before using large; n13 orange and n14 royal blue are 1680x2520 (better, 47-55).
- Backdrop ideas: seamless studio surface + top spotlight cone + soft floor pool (n06, n12).
- Cut-out recipe: isnet-general-use mask -> trimap -> PyMatting alpha + estimate_foreground_ml, then strip wall-coloured fringe. BiRefNet runs out of memory on this 8 GB box.
- Layout v4: model centred, 2 callouts each side, hairlines with dots on the tee, no feature grid.

| id | original | size | sharp | content |
|---|---|---|---|---|
| n01 | Photoroom-20260516_225209290 | 1568x2354 | 119 | Discipline, front head-down, sage-green plain wall (light) |
| n02 | Photoroom-20260516_224814320 | 1152x2048 | 7 | Arise, full body, green |
| n03 | Photoroom-20260516_224809966 | 1152x2048 | 6 | Arise, full body, dark green |
| n04 | Photoroom-20260516_224447585 | 1152x2048 | 7 | Arise, full body, sage green |
| n05 | Photoroom-20260516_224209785 | 1152x2048 | 10 | Arise, full body, grey-green |
| n06 | Photoroom-20260516_222409403 | 1152x2048 | 12 | Arise, full body, grey spotlight on grey |
| n07 | Photoroom-20260516_184957220 | 1365x2048 | 39 | Discipline, front, green gradient (dark floor) |
| n08 | Photoroom-20260516_184938638 | 1365x2048 | 39 | Discipline, front, dark-green vignette (bottom edge has wood strip) |
| n09 | 20260510_165809282_6 | 1568x2354 | 103 | Discipline, front, navy blue plain |
| n10 | 20260510_165809282_3 | 1568x2354 | 103 | Discipline, front, maroon plain |
| n11 | 20260510_165809282_2 | 1568x2354 | 103 | Discipline, front, navy blue plain (variant) |
| n12 | Photoroom-20260516_163920735 | 1152x2048 | 11 | Arise, full body, near-black with top spotlight |
| n13 | 20260510_1341255_3 | 1680x2520 | 55 | Arise, full body (3/4 crop), orange |
| n14 | 20260510_1341255_2 | 1680x2520 | 47 | Arise, full body, royal blue |
| n15 | Photoroom-20260515_192647755 | 1152x2048 | 12 | Arise, full body, blue gym wall with rack |
