curl  -o file --header "Content-Type: application/json" --request POST --data ' {"pk": "","module": "sdxl-pipeline:v0.9-base-lilypad3", "inputs": "-i Prompt='an astronaut floating against a white background' -i Steps=50","opts": { "stream": true }}' http://js-cli-wrapper.lilypad.tech