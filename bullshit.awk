function min(a, b){
	if(a > b)
		return b
	else
		return a
}
function suffix(){
	if(hassuffix = (rand() < 0.2))
		return suffixes[int(rand() * nsuffix)]
	return ""
}
$2 == "*" { protocol[nprotocol++] = $1; next }
$2 == "$" { end[nend++] = $1; next }
$2 == "%" { suffixes[nsuffix++] = $1; next }
$2 == "^" { start[nstart++] = $1; next }
$2 == "|" { noend[nword] = 1 }
{ word[nword++] = $1; next }
END {
	srand()
	last = -1
	out = 0
	total = int(rand() * 7) + 3
	n = int(rand() * min(total - out, 3))
	for(i = 0; i < n; i++)
		printf "%s ", start[int(rand() * nstart)]
	out += n
	hassuffix = 0
	n = int(rand() * min(total - out, 3))
	for(i = 0; i < n; i++)
		printf "%s%s ", word[last = int(rand() * nword)], suffix()
	out += n
	if(rand() > 0.5){
		n = int(rand() * 3)
		for(i = 0; i < n; i++)
			printf "%s %s", protocol[int(rand() * nprotocol)], (i != n-1) ? "over " : ""
		out += n
		last = -1
		hassuffix = 0
	}
	n = int(rand() * min(total - out, 3))
	if(out + n == 1 || last == -1)
		n += 2
	for(i = 0; i < n; i++)
		printf "%s%s ", word[last = int(rand() * nword)], suffix()
	if(rand() < 0.1 || (last >= 0 && noend[last]) || hassuffix)
		printf "%s ", end[int(rand() * nend)]
	print ""
}
