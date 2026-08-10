// AI Chat Widget
class ChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.addWelcomeMessage();
    }

    createWidget() {
        // Create chat button
        this.chatButton = document.createElement('div');
        this.chatButton.className = 'fixed bottom-6 right-6 z-50 cursor-pointer';
        this.chatButton.innerHTML = `
            <div class="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/30">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            </div>
        `;

        // Create chat window
        this.chatWindow = document.createElement('div');
        this.chatWindow.className = 'fixed bottom-24 right-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 hidden';
        this.chatWindow.innerHTML = `
            <div class="bg-primary text-white p-4 rounded-t-2xl">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 class="font-semibold">Ms. (Dr.) Samantha Tross AI Assistant</h3>
                            <p class="text-xs text-white/80">Online now</p>
                        </div>
                    </div>
                    <button id="close-chat" class="text-white hover:text-gray-200 transition-colors">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col">
                <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3">
                    <!-- Messages will be added here -->
                </div>
                
                <!-- Contact Information -->
                <div class="px-4 py-3 bg-gray-50 border-t">
                    <div class="text-xs text-gray-600 mb-2">Need to speak to someone directly?</div>
                    <div class="grid grid-cols-2 gap-2 text-xs">
                        <div class="flex items-center space-x-2">
                            <svg class="w-3 h-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                            <a href="tel:02079521009" class="text-primary hover:text-primary-dark font-medium">020 7952 1009</a>
                        </div>
                        <div class="flex items-center space-x-2">
                            <svg class="w-3 h-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                            <a href="mailto:secretary@sztrossltd.com" class="text-primary hover:text-primary-dark font-medium">Email</a>
                        </div>
                    </div>
                </div>
                
                <div class="p-3 border-t">
                    <div class="flex space-x-2">
                        <input type="text" id="chat-input" placeholder="Type your message..." 
                               class="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                        <button id="send-message" class="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors text-sm">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Add to page
        document.body.appendChild(this.chatButton);
        document.body.appendChild(this.chatWindow);

        // Add event listeners
        this.chatButton.addEventListener('click', () => this.toggleChat());
        document.getElementById('close-chat').addEventListener('click', () => this.closeChat());
        document.getElementById('send-message').addEventListener('click', () => this.sendMessage());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        if (this.isOpen) {
            this.chatWindow.classList.remove('hidden');
            document.getElementById('chat-input').focus();
        } else {
            this.chatWindow.classList.add('hidden');
        }
    }

    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.add('hidden');
    }

    addWelcomeMessage() {
        this.addMessage('Hello! I\'m Ms. (Dr.) Samantha Tross\'s AI assistant. I can help you with questions about hip and knee replacement surgery, booking consultations, recovery, and more. What would you like to know?', 'bot');
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex items-start space-x-2 ${sender === 'user' ? 'justify-end' : ''}`;

        const avatar = document.createElement('div');
        avatar.className = `w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${sender === 'user' ? 'bg-primary text-white order-2' : 'bg-primary/10 text-primary'}`;
        avatar.textContent = sender === 'user' ? 'U' : 'AI';

        const messageContent = document.createElement('div');
        messageContent.className = `max-w-xs px-3 py-2 rounded-lg text-sm ${sender === 'user' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`;
        messageContent.innerHTML = this.formatMessage(text);

        if (sender === 'user') {
            messageDiv.appendChild(messageContent);
            messageDiv.appendChild(avatar);
        } else {
            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
        }

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    formatMessage(text) {
        // Convert links to clickable links
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary underline hover:text-primary-dark">$1</a>');
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        input.value = '';

        // Simulate typing delay
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
        }, 1000);
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // AI Response Database
        const responses = {
            // Booking & Administration
            'book': {
                keywords: ['book', 'consultation', 'appointment', 'schedule', 'referral'],
                response: `To book a consultation with Dr Tross:

**📞 Phone:** 020 7952 1009
**📧 Email:** secretary@sztrossltd.com
**🌐 Online:** Use the "Book Consultation" button on this website

**Do I need a GP referral?**
• Self-pay patients: No referral needed
• Private medical insurance: Most UK insurers require a GP referral letter

**How soon can I be seen?** Usually within 1-2 weeks, urgent cases sooner.

[Book your consultation now](index.html#locations)`
            },
            
            // Procedures
            'procedures': {
                keywords: ['procedure', 'surgery', 'hip', 'knee', 'replacement', 'arthroscopy'],
                response: `Dr Tross offers comprehensive orthopaedic procedures:

**Hip Surgery:**
• Total and partial hip replacement
• Robotic-assisted hip surgery (Mako technology)
• Revision hip surgery

**Knee Surgery:**
• Total and partial knee replacement
• Knee arthroscopy
• Sports and soft tissue knee surgery

[Learn about hip replacement](hip-replacement.html) | [Learn about knee replacement](knee-replacement.html) | [Learn about robotic surgery](robotic-surgery.html)`
            },
            
            // Recovery
            'recovery': {
                keywords: ['recovery', 'rehab', 'physiotherapy', 'driving', 'work', 'exercise'],
                response: `**Recovery Timeline:**
• Hospital stay: 2-4 nights typically
• Driving: 4-6 weeks (when safe foot control returns)
• Work: 4-6 weeks (desk jobs), 8-12 weeks (physical jobs)
• Flying: Short flights 4-6 weeks, long haul 3 months

**Recovery Process:**
• Physiotherapy starts in hospital (24-48 hours)
• Pain management with tablets and injections
• Low-impact sports after ~3 months

**Important:** Contact your care team if you notice swelling, redness, severe pain, fever, or wound discharge.

[Learn more about Ms. (Dr.) Samantha Tross's approach](about.html)`
            },
            
            // Risks
            'risks': {
                keywords: ['risk', 'complication', 'infection', 'blood clot', 'dislocation'],
                response: `**Main Surgery Risks:**
• Infection (<1%)
• Blood clots (DVT or pulmonary embolism)
• Nerve or vessel injury
• Leg length difference (hip)
• Dislocation (hip)
• Stiffness (knee)
• Implant wear over time

**Safety Reminders:**
Seek urgent help if you develop sudden severe pain, fever, wound leakage, or difficulty moving the leg.

Ms. (Dr.) Samantha Tross uses advanced techniques including robotic surgery to minimise risks.

[Learn about robotic surgery benefits](robotic-surgery.html)`
            },
            
            // Insurance
            'insurance': {
                keywords: ['insurance', 'bupa', 'axa', 'aviva', 'payment', 'cost'],
                response: `**Insurance Coverage:**
Ms. (Dr.) Samantha Tross is recognised by major UK providers:
• Bupa, AXA PPP, Aviva
• WPA, Vitality, Cigna

**For Insurance Authorisation:**
• GP referral letter (usually required)
• Policy number
• Pre-authorisation code

**Self-Pay Patients:**
Costs are explained at booking. No referral needed.

**📞 Contact:** 020 7952 1009 for pricing information
**📧 Email:** secretary@sztrossltd.com

[View our locations](locations.html)`
            },
            
            // Contact Information
            'contact': {
                keywords: ['contact', 'phone', 'email', 'call', 'reach', 'get in touch'],
                response: `**Contact Dr Tross's Practice:**

**📞 Phone:** 020 7952 1009
**📧 Email:** secretary@sztrossltd.com
**📱 Mobile/WhatsApp:** 07943 947639 (urgent or admin queries)

**Office Hours:** Monday-Friday, 9am-5pm
**Emergency:** For urgent medical concerns, please call the main number

**Online Booking:** Use the "Book Consultation" button on this website

[Book your consultation now](index.html#locations)`
            },
            
            // About Ms. (Dr.) Samantha Tross
            'about': {
                keywords: ['about', 'who', 'background', 'experience', 'qualifications'],
                response: `**About Ms. (Dr.) Samantha Tross:**
• Consultant Orthopaedic and Trauma Surgeon specialising in hip and knee replacement
• Qualifications: MBBS, FRCS, FRCS(Ed), FRCS(Tr&Orth), MSL, DA (Hons) Portsmouth
• First Black Female Orthopaedic consultant in the UK
• Pioneer in robotic hip replacement surgery (Mako technology) - first woman in Europe to perform Mako Robotic Hip Surgery in 2018
• Trained at University College London
• Completed international fellowships in Toronto, Canada and Sydney, Australia
• Council Member, Royal College of Surgeons of England (elected 2025)

**Specialities:**
• Joint replacement surgery (primary and revision)
• Robotic-assisted procedures
• Women's health orthopaedics
• Minimally invasive surgery

[Read Ms. (Dr.) Samantha Tross's full profile](about.html) | [View her achievements](distinctions.html)`
            },
            
            // Locations
            'locations': {
                keywords: ['location', 'hospital', 'where', 'address', 'clinic'],
                response: `**Ms. (Dr.) Samantha Tross practices at five convenient London locations:**

• **Chiswick Medical Practice** - 347-352 Chiswick High Road, London, W4 4HS
• **Clementine Churchill Hospital** - Sudbury Hill, Harrow, Middlesex, HA1 3RX
• **Cromwell Hospital** - Cromwell Road, London, SW5 0TU
• **Fortius Clinic** - 66 Wigmore Street, London, W1U 2SB
• **LycaHealth Canary Wharf** - 1 Westferry Circus, London, E14 4HD

All locations offer modern facilities and easy transport access.

[View detailed locations and maps](locations.html)`
            },
            
            // Women's Health
            'womens': {
                keywords: ['women', 'female', 'menopause', 'women\'s health', 'hormonal'],
                response: `**Women's Health Specialisation:**
Ms. (Dr.) Samantha Tross has a special interest in women's health orthopaedics, particularly:
• Effects of hormonal changes on joint pathology
• Women-specific orthopaedic conditions
• Holistic approach to women's joint health

She works with dedicated physiotherapists, dieticians and cognitive behavioural specialists to explore non-surgical solutions where possible.

[Learn about women's health services](womens-health.html)`
            }
        };

        // Check for specific response categories
        for (const [category, data] of Object.entries(responses)) {
            if (data.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return data.response;
            }
        }
        
        // Default responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return `Hello! I'm Ms. (Dr.) Samantha Tross's AI assistant. I can help you with questions about hip and knee replacement surgery, booking consultations, recovery, and more. What would you like to know?`;
        }
        
        if (lowerMessage.includes('thank')) {
            return `You're welcome! Is there anything else I can help you with about Ms. (Dr.) Samantha Tross's services?`;
        }
        
        return `I understand you're asking about "${message}". I can help you with information about Ms. (Dr.) Samantha Tross's procedures, booking consultations, recovery, insurance, and more. Could you be more specific about what you'd like to know?`;
    }
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new ChatWidget();
});
