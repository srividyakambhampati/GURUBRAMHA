const fs = require('fs');

const mdContent = fs.readFileSync('Database_Documentation.md', 'utf8');

let rtfContent = `{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}
{\\*\\generator Node.js RTF Converter}\\viewkind4\\uc1
\\pard\\sa200\\sl276\\slmult1\\f0\\fs24\\par
`;

const lines = mdContent.split('\n');

for (let line of lines) {
    line = line.replace(/\r/g, '');
    
    if (line.startsWith('## ')) {
        // Section Header
        let text = line.replace('## ', '');
        rtfContent += `\\par\\b\\fs32 ${text}\\b0\\fs24\\par\n`;
    } 
    else if (line.startsWith('### ')) {
        // Sub Header
        let text = line.replace('### ', '');
        rtfContent += `\\par\\b\\fs28 ${text}\\b0\\fs24\\par\n`;
    }
    else if (line.startsWith('# ')) {
        // Main Title
        let text = line.replace('# ', '');
        rtfContent += `\\pard\\qc\\b\\fs36 ${text}\\b0\\fs24\\pard\\sa200\\sl276\\slmult1\\par\n`;
    }
    else if (line.trim() === '---') {
        // Divider
        rtfContent += `\\par --------------------------------------------------------------------------------\\par\n`;
    }
    else if (line.trim() === '') {
        // Empty line
        // rtfContent += `\\par\n`;
    }
    else {
        // Regular line
        let text = line;
        
        // Remove markdown bullets and use hyphens
        text = text.replace(/^(\s*)\* /g, '$1- ');
        
        // Bold tags
        text = text.replace(/\*\*(.*?)\*\*/g, '\\b $1\\b0 ');
        
        // Inline code
        text = text.replace(/`(.*?)`/g, '"$1"');
        
        // Handle basic escaping for RTF
        text = text.replace(/\\/g, '\\\\').replace(/\{/g, '\\{').replace(/\}/g, '\\}');
        
        rtfContent += `${text}\\par\n`;
    }
}

rtfContent += `}`;

fs.writeFileSync('Database_Documentation.rtf', rtfContent);
console.log("Successfully created Database_Documentation.rtf");
