import json

with open("readup_all_data_merged.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for item in data:
    if item.get("questions"):
        print(f"Item {item['id']} has {len(item['questions'])} questions.")
        print(json.dumps(item['questions'][0], indent=2, ensure_ascii=False))
        break
