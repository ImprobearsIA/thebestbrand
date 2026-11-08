with open("apps/web/tbb-commercial-experience-and-payments.js", "r", encoding="utf-8") as f:
    src = f.read()

stack = []
i = 0
n = len(src)

while i < n:
    ch = src[i]
    if ch == "\\":
        i += 2
        continue
    
    if not stack:
        if ch == "`":
            line = src[:i].count("\n") + 1
            stack.append(("TL", line))
        elif ch in "\"'":
            quote = ch
            i += 1
            while i < n:
                if src[i] == "\\":
                    i += 2
                    continue
                if src[i] == quote:
                    break
                i += 1
        elif ch == "/" and i + 1 < n and src[i+1] == "/":
            while i < n and src[i] != "\n":
                i += 1
        elif ch == "/" and i + 1 < n and src[i+1] == "*":
            i += 2
            while i + 1 < n and not (src[i] == "*" and src[i+1] == "/"):
                i += 1
            i += 1
    else:
        top = stack[-1]
        top_type = top[0]
        top_line = top[1]
        if top_type == "TL":
            if ch == "`":
                stack.pop()
            elif ch == "$" and i + 1 < n and src[i+1] == "{":
                i += 1
                stack.append(["EXPR", top_line, 1])
        elif top_type == "EXPR":
            if ch in "\"'":
                quote = ch
                i += 1
                while i < n:
                    if src[i] == "\\":
                        i += 2
                        continue
                    if src[i] == quote:
                        break
                    i += 1
            elif ch == "`":
                line = src[:i].count("\n") + 1
                stack.append(["TL", line])
            elif ch == "{":
                top[2] += 1
            elif ch == "}":
                top[2] -= 1
                if top[2] == 0:
                    stack.pop()
    i += 1

print("Remaining stack:", stack)
